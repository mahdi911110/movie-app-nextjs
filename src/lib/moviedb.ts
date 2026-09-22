import Database from 'better-sqlite3';
import * as bcrypt from 'bcrypt';

const db = new Database('movie.db');

db.pragma('foreign_keys = on');

db.exec(`
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS watchlist(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS watchlist_items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER NOT NULL,
    watchlist_id INTEGER NOT NULL,
    UNIQUE(movie_id, watchlist_id),
    FOREIGN KEY (watchlist_id) REFERENCES watchlist(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS sessions(
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

export const createUser = db.transaction(
  (username: string, email: string, password_hash: string) => {
    const getUsername = db.prepare(`
      SELECT id FROM users
      WHERE username = ?
    `).get(username);

    const getEmail = db.prepare(`
      SELECT id FROM users
      WHERE email = ?
    `).get(email);

    if (getUsername) {
      return { error: 'Username already exists' };
    }

    if (getEmail) {
      return { error: 'Email already exists' };
    }

    const user = db.prepare(`
      INSERT INTO users (
        username,
        email,
        password_hash
      ) VALUES (?, ?, ?)
    `).run(username, email, password_hash);

    const userId = Number(user.lastInsertRowid);

    db.prepare(`
      INSERT INTO watchlist (user_id)
      VALUES (?)
    `).run(userId);

    return { userId };
  }
);

export function addWatchlistItem(userId: number, movieId: number) {
  const watchlist = db.prepare(`
    SELECT id FROM watchlist
    WHERE user_id = ?
  `).get(userId) as { id: number } | undefined;

  if (!watchlist) {
    throw new Error('Watchlist not found');
  }

  db.prepare(`
    INSERT INTO watchlist_items (
      movie_id,
      watchlist_id
    ) VALUES (?, ?)
  `).run(movieId, watchlist.id);
}

export function removeWatchlistItem(userId: number, movieId: number) {
  const watchlist = db.prepare(`
    SELECT id FROM watchlist
    WHERE user_id = ?
  `).get(userId) as { id: number } | undefined;
  
  if (!watchlist) {
    throw new Error('Watchlist not found');
  }

  db.prepare(`
    DELETE FROM watchlist_items
    WHERE movie_id = ? AND watchlist_id = ?
  `).run(movieId, watchlist.id);
}

export function createSession(sessionId: string, userId: number, expiresAt: string) {
  db.prepare(`
    INSERT INTO sessions (
      id,
      user_id,
      expires_at
    ) VALUES (?, ?, ?)
  `).run(sessionId, userId, expiresAt);
}

type User = {
  id: number;
  username: string;
  email: string;
}

export function getUser(sessionId: string) {
  const session = db.prepare(`
    SELECT
      sessions.user_id,
      sessions.expires_at
    FROM sessions
    WHERE sessions.id = ?
  `).get(sessionId) as
    | { user_id: number; expires_at: string }
    | undefined;

  if (!session) {
    throw new Error('Session not found');
  }

  if (new Date(session.expires_at) <= new Date()) {
    db.prepare(`
      DELETE FROM sessions
      WHERE id = ?
    `).run(sessionId);

    throw new Error('Session expired');
  }

  const user = db.prepare(`
    SELECT id, username, email
    FROM users
    WHERE id = ?
  `).get(session.user_id) as User | undefined;

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export function getWatchlistItems(userId: number) {
  const watchlistItem = db.prepare(`
    SELECT watchlist_items.movie_id
    FROM watchlist_items
    JOIN watchlist
      ON watchlist.id = watchlist_items.watchlist_id
    WHERE watchlist.user_id = ?
  `).all(userId) as { movie_id: number }[];

  return watchlistItem;
}

export function getWatchlistItemsByPage(userId: number, page: number) {
  const limit = 20;
  const offset = (page - 1) * limit;
  const watchlistItem = db.prepare(`
    SELECT watchlist_items.movie_id
    FROM watchlist_items
    JOIN watchlist
      ON watchlist.id = watchlist_items.watchlist_id
    WHERE watchlist.user_id = ?
    ORDER BY watchlist_items.id DESC
    LIMIT ? OFFSET ?
  `).all(userId, limit, offset) as { movie_id: number }[];

  return watchlistItem;
}

export function getWatchlistItemsLastPage(userId: number) {
  const watchlist = db.prepare(`
    SELECT
      COUNT(*) as lastPage
    FROM watchlist_items
    JOIN watchlist ON watchlist.id = watchlist_items.watchlist_id
    WHERE watchlist.user_id = ?
  `).get(userId) as { lastPage: number } | undefined;

  if (!watchlist) {
    return undefined;
  }

  const limit = 20;

  const totalPages = Math.ceil(watchlist.lastPage / limit);

  return totalPages;
}

export function removeSession(sessionId: string) {
  db.prepare(`
    DELETE FROM sessions
    WHERE id = ?
  `).run(sessionId);
}

type Users = {
  id: number;
  username: string;
  emil: string;
  password_hash: string;
}

export async function login(
  usernameOrEmail: string,
  password: string
) {
  const user = db
    .prepare(`
      SELECT *
      FROM users
      WHERE username = ? OR email = ?
    `)
    .get(usernameOrEmail, usernameOrEmail) as Users | undefined;

  if (!user) {
    return {
      error: "Invalid username/email or password",
    };
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isCorrectPassword) {
    return {
      error: "Invalid username/email or password",
    };
  }

  return {
    success: true,
    userId: user.id
  };
}