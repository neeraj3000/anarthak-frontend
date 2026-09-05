# Anarthak (अनर्थक) — Frontend

> **"Not Like Them"** — Premium Heavyweight Streetwear E-Commerce Experience.

Anarthak is a high-performance, design-forward e-commerce web application engineered for a modern luxury streetwear brand. Inspired by brutalist minimalism, raw industrial aesthetics, and rebellious counter-culture, it features custom typography, dynamic dark/light themes, smooth micro-interactions, and a full-featured shopping experience.

---

## 01 / Key Features

### 1.1 Shopping & Discovery
- **Hero & Drop Showcase**: Bold homepage with cinematic hero banner, latest drops, category showcases, community reviews, and newsletter subscription.
- **Dynamic Catalog & Filtering**: Browse by collection with real-time filtering by category, size, colorway, price range, and sort orders (newest, price ascending/descending, popularity).
- **Product Detail View**:
  - Multi-angle high-resolution image gallery
  - Colorway & size selectors with live stock indicators
  - Fabric specifications (300+ GSM heavyweight breakdown, cut profile, care guide)
  - Accordion drawers for shipping, sizing, and material composition
  - Customer review breakdowns and related product recommendations

### 1.2 Cart, Wishlist & Modals
- **Dual Cart System**: Slide-out quick `CartDrawer` accessible anywhere + dedicated `/cart` page.
- **Dynamic Free Shipping Meter**: Visual progress indicator towards free shipping qualification.
- **Coupon & Discount Engine**: Apply promotional codes with instant subtotal recalculation.
- **Quick View Modal**: Instant product inspection modal without leaving the catalog.
- **Size Guide Modal**: Comprehensive size measurements and fit recommendation table.
- **Live Search Modal**: Instant debounced search with trending tags and recent search history.
- **Wishlist**: Quick-save favorite pieces with persistent local storage.

### 1.3 Checkout & Account
- **Streamlined Checkout (`/checkout`)**: Shipping address selection, express shipping methods, and mock payment gateway (UPI / Cards / Net Banking / COD).
- **Celebration Confirmation (`/order-confirmation`)**: Order recap with interactive confetti animations powered by `canvas-confetti`.
- **Account Dashboard (`/account`)**: Order history tracking with live shipping status badges, address book management, and user preferences.

### 1.4 Design & Aesthetic
- **Brutalist / Industrial Streetwear Aesthetic**: Monochromatic foundations accented by brand red (`#FF1E27`), deep obsidian (`#0A0A0C`), and refined grey tones.
- **Curated Typography**:
  - **Syne** (Editorial headlines)
  - **Teko** (Display & impact banners)
  - **Plus Jakarta Sans** (Readable body copy)
  - **JetBrains Mono** (Technical fabric & sizing specs)
- **Dark & Light Mode**: Fluid theme switching with custom CSS variables and Tailwind dark mode support.
- **Mobile-First Experience**: Sticky bottom navigation bar (`MobileBottomBar`) and touch-optimized controls.

---

## 02 / Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Design System (`src/index.css`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **FX & Animation**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Linting**: [ESLint 10](https://eslint.org/)

---

## 03 / Project Structure

```text
anarthak-frontend/
├── public/                 # Static assets & favicons
├── src/
│   ├── assets/             # Images, graphics, and brand assets
│   ├── components/
│   │   ├── account/        # User profile, address management, order history
│   │   ├── auth/           # Login / Register modals
│   │   ├── cart/           # CartDrawer and FullCartView
│   │   ├── checkout/       # CheckoutView and OrderConfirmationView
│   │   ├── collections/    # Collection overview and category views
│   │   ├── common/         # Navbar, Footer, Toast, Modals, MobileBottomBar
│   │   ├── home/           # Homepage hero, marquee, featured drops, reviews
│   │   ├── product/        # ProductDetailView, size guide, gallery
│   │   ├── search/         # Live search modal
│   │   ├── shop/           # Catalog grid, filters, sorting toolbar
│   │   └── wishlist/       # WishlistView
│   ├── context/
│   │   └── StoreContext.jsx # Global state (cart, wishlist, orders, addresses, theme)
│   ├── data/
│   │   ├── collections.js  # Collections metadata & categories
│   │   ├── products.js     # Streetwear catalog data, variants & specs
│   │   └── reviews.js      # Customer reviews & ratings
│   ├── App.jsx             # App layout, router configurations, global modals
│   ├── index.css           # Design tokens, CSS variables & typography rules
│   └── main.jsx            # React root mount
├── index.html              # HTML shell with Google Fonts & Tailwind config
├── package.json            # Scripts & project dependencies
└── vite.config.js          # Vite build configuration
```

---

## 04 / Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/neeraj3000/anarthak-frontend.git
   cd anarthak-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

Build optimized static assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Code Quality

Run ESLint across the codebase:

```bash
npm run lint
```

---

## 05 / State Persistence

The application uses browser `localStorage` to persist:
- `anarthak_cart_v2`: Active cart items, selected sizes, quantities
- `anarthak_wishlist_v2`: Wishlisted product IDs
- `anarthak_orders_v2`: Order history & generated tracking numbers
- `anarthak_addresses_v2`: Saved delivery addresses
- `anarthak_theme_v2`: User's preferred theme mode (`dark` / `light`)

---

## 06 / License

Private project. All rights reserved.
