# 🏆 Auction Platform

A modern auction web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.  
It allows users to browse auction items, search & filter by category, status, or price range, and manage a list of favorite items.

## 🔥 Features

- 📦 **Server-Side Rendering (SSR)** with Next.js for fast performance

- 🎨 **Tailwind CSS** for styling

- 🗂 **Context API** for global state (favorites)

- 🔎 **Search & Filters** (query, category, status, price range, favorites)

- ❤️ **Favorites System** (stored in `localStorage`)

- 🖼 **Lazy-loaded Images** with fallback placeholders

- ✅ Accessible semantic structure with properly ordered headings

---

## 📂 Project Structure

src/
├─ app/ # Next.js app directory (routes, layouts, pages)
├─ components/ # Reusable UI components
├─ context/ # React Context providers (AuctionProvider)
├─ hooks/ # Custom React hooks (useFavorites, useAuctionData)
├─ lib/ # Utilities, constants, helper functions
├─ types/ # TypeScript types (AuctionItem, Filters, etc.)
└─ public/ # Static assets (placeholder images, etc.)

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed

### 1️⃣ Clone the Repository

```
git clone https://github.com/Alexasky/auction-house.git
cd auction-house

```

### 2️⃣ Install Dependencies

```
npm install

```

### 3️⃣ Start the React App

```
npm run dev

```

App runs on http://localhost:3000
