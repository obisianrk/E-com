# Obisian Commerce Demo

An interactive React + Vite prototype that routes all auth flows through API calls (via React Query) and unlocks a commerce dashboard once authenticated.

## Quick start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` and either sign up or log in. Both flows hit a dummy REST endpoint (`jsonplaceholder.typicode.com`) to mimic network latency. User records are stored in `localStorage` purely to emulate server persistence.

## Tech stack

- React 19 + TypeScript + Vite 7
- React Router 7 for navigation and route protection
- @tanstack/react-query for API mutations + caching
- Tailwind CSS 3 for styling (utility-only, no custom CSS components)

## Project structure

```
src/
├── App.tsx                    # Route definitions + auth guard wiring
├── context/AuthContext.tsx    # Session storage + helpers
├── services/authApi.ts        # Dummy API client used by React Query
├── pages/
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── DemoPage.tsx
└── index.css                  # Tailwind entry point + base styles
```

## Building for production

```bash
npm run build
npm run preview
```

> ⚠️ Vite 7 requires Node 20.19+ or 22.12+. Update your local Node version if you see an engine warning.

