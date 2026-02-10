# 🔍 GitHub User Search

A modern, responsive GitHub user discovery app built with **React**, **TypeScript**, and **TanStack Query**. Quickly search for GitHub users, handle API rate limits gracefully, and enjoy a clean, mobile-friendly UI.

---

## 🚀 Features

* **Real-time Search** – Search GitHub users instantly by username
* **Debounced Input** – Reduces unnecessary API calls and avoids rate limiting
* **TanStack Query** – Smart caching, background refetching, and error handling
* **Rate-Limit Handling** – User-friendly alerts and countdown when API limits are reached
* **Responsive Design** – Fully mobile-friendly layout powered by Tailwind CSS

---

## 🛠️ Tech Stack

* **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **State & Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/ansel101/github-user-search.git
cd github-user-search
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## 🔐 Rate Limits & GitHub API

This project uses the **public GitHub Search API**.

* **Without authentication**: 10 requests per minute
* When the limit is reached, the app displays a countdown until the limit resets

> 💡 Tip: You can extend the rate limit by adding a personal GitHub access token.

---

## 👤 Author

Built by **Ansel** © 2026
