# 🛍️ Product Explorer — CSE-2340 (MP3–MP4)

> An interactive, API-driven **Product Explorer** web application built with **HTML5**, **CSS3**, and **Vanilla JavaScript** for **CSE-2340 (Software Development I)** at **International Islamic University Chittagong (IIUC)**.

---

## 📌 Course & Student Details

| Field | Details |
| :--- | :--- |
| **Course** | CSE-2340 — Software Development I |
| **Assessment** | Mini Project 3–4 (MP3–MP4) — CO3, CO4 |
| **Department** | Dept. of Computer Science & Engineering, IIUC |
| **Student Name** | `[Abdullah Al Noman]` |
| **Student ID** | `[C253137]` |

---

## ✨ Key Features

* **🔎 Live Search:** Filter products instantaneously by product title or brand name.
* **🏷️ Category Filtering:** Dynamically generated category filter buttons (`All Categories` and API categories).
* **💾 Saved Items (`localStorage`):** Save or remove favorite products and view them anytime under **Saved**, even after refreshing the page.
* **⚡ Async API States:** Clean handling of **Loading**, **Error** (with a one-click **Retry** button), and **Empty** states.
* **📱 Responsive Grid Layout:** Adapts smoothly across desktop, tablet, and mobile screens.

---

## 🎯 Rubric & Requirements Mapping (14 Marks)

| Component | Marks | Implementation Summary |
| :--- | :---: | :--- |
| **1. DOM Manipulation & Dynamic Rendering** *(MP3)* | **4** | Dynamically creates and updates product cards, category pills, and empty/status messages using `querySelector()`, `createElement()`, and `innerHTML`. |
| **2. Event Handling & JS Logic** *(MP3)* | **3** | Handles `input` and `click` events via `addEventListener()`, managing state with objects, arrays, `map()`, `filter()`, `forEach()`, and `find()`. |
| **3. API Integration & Async Operations** *(MP4)* | **4** | Fetches products from DummyJSON using `fetch()`, `async/await`, and `try/catch` with loading, error + retry, and empty state feedback. |
| **4. Local Storage** *(MP4)* | **3** | Persists saved product IDs in `localStorage` using `JSON.stringify()` and `JSON.parse()` across page reloads. |
| **Total** | **14** | **All MP3 & MP4 requirements fulfilled** |

---

## 📂 Project Structure

```text
product-explorer/
├── index.html      # Main page markup & container elements
├── style.css       # Responsive grid, buttons, cards & status styling
├── script.js       # API fetching, filtering, DOM rendering & Local Storage logic
└── README.md       # Project documentation
