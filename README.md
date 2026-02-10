````markdown
# 🔍 GitHub User Search 

A modern, responsive GitHub user discovery tool built with **React**, **TypeScript**, and **TanStack Query**. This project demonstrates efficient API handling, custom debouncing, and professional UI styling using **shadcn/ui**.

## 🚀 Features

* **Real-time Search**: Find any GitHub user by their username.
* **Intelligent Debouncing**: Optimized API calls to prevent rate-limiting and unnecessary network traffic.
* **TanStack Query Integration**: Advanced data fetching with built-in caching and error management.
* **Graceful Rate Limit Handling**: Custom UI alerts that inform the user when the GitHub API limit is reached and when it will reset.
* **Responsive Design**: Fully mobile-friendly layout built with Tailwind CSS.

## 🛠️ Tech Stack

* **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **State Management**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
* **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ansel101/github-user-search.git
   cd github-user-search
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

## 🛡️ Rate Limits & API

This application uses the public GitHub Search API. Without a token, users are limited to 10 requests per minute. If you hit the limit, the app will display a countdown until the limit resets.

---

Built by Ansel — 2026

```
```
