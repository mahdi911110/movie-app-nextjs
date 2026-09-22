'use server';

import { cookies } from "next/headers";
import { createSession, getUser, removeSession } from "./moviedb";

export async function createUserSession(userId: number) {
  const cookie = await cookies();
  const sessionId = crypto.randomUUID();
  
  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toISOString();
  
  createSession(sessionId, userId, expiresAt);
  
  cookie.set('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function getUserSession() {
  const cookie = await cookies();
  const sessionId = cookie.get('session')?.value;
  
  if (!sessionId) {
    return null;
  }

  try {
    return getUser(sessionId);
  } catch {
    return null;
  }
}

export async function removeUserSession() {
  const cookie = await cookies();
  const sessionId = cookie.get('session')?.value;
  if (sessionId) {
    removeSession(sessionId);
  }
  cookie.delete('session');
}