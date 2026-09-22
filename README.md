<h1 align="center">🎬 Movie App</h1>

<p align="center">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white">
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">
  <img src="https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white">
</p>

A full-stack movie discovery web application built with **Next.js**, **TypeScript**, **React Query**, **TMDB API**, **SQLite**, and **Tailwind CSS**.

The application allows users to discover movies, search and filter by categories and genres, view detailed movie information, create an account, and manage a personal watchlist.

## ✨ Features

- 🎬 Browse upcoming, popular, top-rated, trending, and now-playing movies
- 🔎 Search movies
- 🎭 Browse movies by genre
- 📄 Paginated movie listings
- 🎥 Detailed movie pages
- ⭐ Movie ratings and metadata
- 🔖 Personal watchlist
- 👤 User registration and login
- 🔐 Session-based authentication
- 🌐 Persian and English language support
- ↔️ RTL / LTR layout support
- 🌍 Localized movie data using TMDB language support
- ⚡ Client-side data fetching and caching with TanStack Query
- 💀 Loading skeletons for better loading experience
- ❌ Reusable error and retry states
- 📱 Responsive design
- 🗄️ SQLite database for users, sessions, and watchlists

## 🛠️ Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) — React framework
- [React](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Lucide React](https://lucide.dev/) — Icons
- [TanStack Query](https://tanstack.com/query) — Server-state management and caching
- [i18next](https://www.i18next.com/) — Internationalization

### Backend

- Next.js App Router
- Next.js Route Handlers
- Server Actions
- SQLite
- better-sqlite3
- bcrypt — Password hashing
- Zod — Data validation

### API

- [TMDB API](https://developer.themoviedb.org/docs/getting-started) — Movie data, images, genres, ratings, and metadata

## 📸 Preview

### Home Page

![Home Page](screenshots/home.png)

### Movie Details

![Movie Details](screenshots/movie-details.png)

### Search / Category Page

![Movie Listing](screenshots/movies.png)

### Watchlist

![Watchlist](screenshots/watchlist.png)

> Replace the screenshot paths above with the actual paths and filenames in your repository.

## 📂 Project Structure

```text
movie-app-nextjs/
├── public/
│   ├── icons/
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── (marketing)/
│   │   │   ├── (auth)/
│   │   │   └── ...
│   │   │
│   │   └── api/
│   │       └── movies/
│   │           ├── [...query]/
│   │           └── watchlist/
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── marketing/
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── moviedb.ts
│   │   └── ...
│   │
│   ├── types/
│   │   └── types.ts
│   │
│   └── ...
│
├── public/
├── .env.local
├── package.json
└── README.md
```

## 🔐 Authentication

The application uses a custom session-based authentication system.

User sessions are stored in SQLite and identified using a secure session ID stored in an HTTP-only cookie.

Passwords are hashed using `bcrypt` before being stored in the database.

Authentication flow:

```text
User
  ↓
Login / Signup
  ↓
Server Action
  ↓
Validate input with Zod
  ↓
Hash / Verify password
  ↓
Create session
  ↓
HTTP-only cookie
  ↓
Authenticated requests
```

## 🔖 Watchlist

Each authenticated user has a personal watchlist.

The database uses relationships between:

```text
users
  │
  └── watchlist
        │
        └── watchlist_items
```

The database also prevents duplicate movies from being added to the same watchlist.

## 🌐 Internationalization

The application supports:

- 🇮🇷 Persian (`fa`)
- 🇬🇧 English (`en`)

The layout automatically switches between:

```text
Persian → RTL
English → LTR
```

Movie data is also requested from TMDB using the selected language.

Example:

```text
/fa/550
/en/550
```

## 🔄 Data Fetching

TanStack Query is used for client-side server-state management.

Example query keys:

```ts
["movies", "popular", lang]

["movies", "discover", genre, page, lang]

["movie", movieId, lang]

["watchlist"]
```

Localized movie data includes `lang` in the query key so that changing the language creates a separate cache entry.

## 🎨 Loading & Error States

The application includes reusable loading skeletons for major sections:

- Hero skeleton
- Movie row skeleton
- Movie grid skeleton
- Movie detail skeleton

It also provides reusable error states with a retry action using TanStack Query's `refetch()`.

## 🗄️ Database

SQLite is used for application data.

Main tables include:

```text
users
sessions
watchlist
watchlist_items
```

Foreign keys and unique constraints are used to maintain data integrity.

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

Get your TMDB API credentials from the TMDB developer platform.

> Never commit `.env.local` or expose your TMDB access token in the repository.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mahdi911110/movie-app-nextjs.git
```

### 2. Navigate to the project

```bash
cd movie-app-nextjs
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env.local
```

and add:

```env
TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 📜 Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs ESLint.

## 📦 Main Dependencies

```text
Next.js
React
TypeScript
@tanstack/react-query
better-sqlite3
bcrypt
zod
i18next
react-i18next
lucide-react
```

## 🎯 Project Goals

This project was built to practice and demonstrate modern full-stack React and Next.js development concepts, including:

- Next.js App Router
- Server Components and Client Components
- Route Handlers
- Server Actions
- Authentication and sessions
- SQLite database design
- API integration
- TanStack Query
- Caching and query invalidation
- Internationalization
- RTL / LTR layouts
- Responsive UI development
- Form validation
- Password hashing
- Loading and error states

## 📌 Future Improvements

Possible future improvements include:

- 🎞️ Trailer playback
- ❤️ Favorite movies
- 👤 More complete user profile functionality
- 🔔 Toast notifications
- 🧪 Automated tests
- 🚀 Improved caching strategies
- 📊 User activity history
- 🎨 More advanced movie recommendations

## 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

## 🙏 Credits

Movie data and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.

## 👨‍💻 Author

**Mahdi Gorbany**

- GitHub: [@mahdi911110](https://github.com/mahdi911110)


## 🙌 Acknowledgements

- Icons from [SVG Repo](https://www.svgrepo.com/) and **Lucide-React**.
- Built with ❤️ using **React** and **NEXTJS**.