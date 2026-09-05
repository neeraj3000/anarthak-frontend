// src/data/products.js
// Indian Luxury Heavyweight Streetwear Catalog for ANARTHAK (अनर्थक) — "Not like them"

export const PRODUCTS = [
  {
    id: "an-01",
    name: "01 KAAL CHAKRA BOXY TEE",
    slug: "kaal-chakra-boxy-tee",
    subtitle: "320 GSM Tirupur Combed Heavyweight Cotton",
    price: 1999,
    originalPrice: 2499,
    badge: "BESTSELLER",
    hallmark: true,
    edition: "VOL 01 / DESI CORE",
    gsm: 320,
    fit: "Boxy Drop-Shoulder",
    category: "Heavyweight",
    tagline: "Not like them. Architectural silhouette built for the Indian street.",
    description: "Constructed from 320 GSM extra-long staple combed cotton milled in Tirupur. Features our signature 1.25-inch high-ribbed collar, dropped shoulders, and blind-stitched hem. Pre-shrunk industrial enzyme wash ensures zero shape distortion in Indian climate.",
    specs: {
      fabric: "100% Tirupur Combed Long-Staple Cotton",
      weight: "320 GSM (Heavyweight)",
      origin: "Tirupur, Tamil Nadu",
      dyeMethod: "Reactive Azo-Free Cold Enzyme Wash",
      collar: "1.25\" Twin-Needle High-Rib Knit (Zero Bacon)",
      stitch: "Reinforced Overlock + Blind Hem"
    },
    colors: [
      { name: "Void Obsidian", hex: "#0E0E11", code: "black" },
      { name: "Blood Crimson", hex: "#FF1E27", code: "red" },
      { name: "Concrete Graphite", hex: "#3F3F46", code: "grey" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 238,
    stock: 6,
    isNew: false,
    featured: true,
    measurements: {
      XS: { chest: "42 in", length: "27 in", shoulder: "20 in" },
      S: { chest: "44 in", length: "28 in", shoulder: "21 in" },
      M: { chest: "46 in", length: "29 in", shoulder: "22 in" },
      L: { chest: "48.5 in", length: "30 in", shoulder: "23.5 in" },
      XL: { chest: "51.5 in", length: "31 in", shoulder: "24.5 in" },
      XXL: { chest: "54 in", length: "32 in", shoulder: "25.5 in" }
    }
  },
  {
    id: "an-02",
    name: "02 REBEL OVERSIZED DROP TEE",
    slug: "rebel-oversized-drop-tee",
    subtitle: "290 GSM Coimbatore Suede-Touch Cotton",
    price: 1799,
    originalPrice: 2199,
    badge: "NEW DROP",
    hallmark: true,
    edition: "VOL 01 / STREET PROTOCOL",
    gsm: 290,
    fit: "Oversized Drop-Shoulder",
    category: "Oversized",
    tagline: "Unapologetic volume with fluid micro-suede brushed hand-feel.",
    description: "Engineered with exaggerated drop-shoulders and a relaxed drape. Milled using organic Coimbatore cotton treated with a micro-suede brush technique that delivers supreme skin comfort without losing structural weight.",
    specs: {
      fabric: "100% Certified Organic Indian Cotton",
      weight: "290 GSM",
      origin: "Coimbatore, Tamil Nadu",
      dyeMethod: "Low-Impact Garment Dye",
      collar: "1\" Seamless Rib Knit",
      stitch: "Single-Needle Clean Precision Finish"
    },
    colors: [
      { name: "Ash Charcoal", hex: "#27272A", code: "charcoal" },
      { name: "Blood Crimson", hex: "#FF1E27", code: "red" },
      { name: "Chalk Off-White", hex: "#F4F4F6", code: "white" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 147,
    stock: 11,
    isNew: true,
    featured: true,
    measurements: {
      S: { chest: "45 in", length: "28.5 in", shoulder: "22 in" },
      M: { chest: "47 in", length: "29.5 in", shoulder: "23 in" },
      L: { chest: "50 in", length: "30.5 in", shoulder: "24.5 in" },
      XL: { chest: "53 in", length: "31.5 in", shoulder: "26 in" }
    }
  },
  {
    id: "an-03",
    name: "03 ANARTHAK MANIFESTO PUFF TEE",
    slug: "anarthak-manifesto-puff-tee",
    subtitle: "340 GSM Master Heavyweight + Devanagari Print",
    price: 2499,
    originalPrice: 2999,
    badge: "LIMITED RUN",
    hallmark: true,
    edition: "RUN 01 / ONLY 150 NUMBERED PIECES",
    gsm: 340,
    fit: "Boxy Drop-Shoulder",
    category: "Graphic Tees",
    tagline: "High-density puff screenprint reading 'अनर्थक — NOT LIKE THEM'.",
    description: "Our signature manifesto piece. Knitted on slow loopwheel tubular frames in Kishangarh. Features tactile high-density matte puff screen-printing in crimson red and industrial grey. Completely seamless sides.",
    specs: {
      fabric: "100% Indian Heavyweight Loopwheel Cotton",
      weight: "340 GSM (Master Heavyweight)",
      origin: "Kishangarh, Rajasthan",
      dyeMethod: "Stonewashed Mineral Wash",
      collar: "1.5\" Heavy Rib",
      stitch: "Vintage Flatlock Seamless Construction"
    },
    colors: [
      { name: "Void Obsidian", hex: "#0E0E11", code: "black" },
      { name: "Concrete Graphite", hex: "#3F3F46", code: "grey" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 5.0,
    reviewCount: 92,
    stock: 4,
    isNew: false,
    featured: true,
    measurements: {
      S: { chest: "44 in", length: "28 in", shoulder: "21.5 in" },
      M: { chest: "46 in", length: "29 in", shoulder: "22.5 in" },
      L: { chest: "49 in", length: "30 in", shoulder: "23.5 in" },
      XL: { chest: "52 in", length: "31 in", shoulder: "25 in" }
    }
  },
  {
    id: "an-04",
    name: "04 KUTCH MINERAL ACID WASH CREW",
    slug: "kutch-mineral-acid-wash-crew",
    subtitle: "280 GSM Stone Distressed Enzyme Patina",
    price: 1899,
    originalPrice: 2299,
    badge: "SALE",
    hallmark: false,
    edition: "ARCHIVE SERIES",
    gsm: 280,
    fit: "Relaxed Vintage",
    category: "Acid Washed",
    tagline: "18-hour cold mineral wash with subtle raw collar patina.",
    description: "Inspired by the raw terrain of Kutch. Undergoes an 18-hour cold mineral enzyme wash yielding unique marbled grey and rust hues. Micro-distressing at the ribbed neck creates an authentic archival finish.",
    specs: {
      fabric: "100% Combed Slub Cotton",
      weight: "280 GSM",
      origin: "Ahmedabad, Gujarat",
      dyeMethod: "Cold Mineral Acid Wash",
      collar: "Distressed Edge Rib Knit",
      stitch: "Overlocked Reinforced Seams"
    },
    colors: [
      { name: "Acid Charcoal", hex: "#2E2F33", code: "charcoal" },
      { name: "Blood Rust", hex: "#9E1C23", code: "rust" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 118,
    stock: 9,
    isNew: false,
    featured: true,
    measurements: {
      XS: { chest: "41 in", length: "27 in", shoulder: "19.5 in" },
      S: { chest: "43 in", length: "28 in", shoulder: "20.5 in" },
      M: { chest: "45 in", length: "29 in", shoulder: "21.5 in" },
      L: { chest: "48 in", length: "30 in", shoulder: "22.5 in" },
      XL: { chest: "51 in", length: "31 in", shoulder: "24 in" }
    }
  },
  {
    id: "an-05",
    name: "05 GULLY RAW-HEM MINIMALIST TEE",
    slug: "gully-raw-hem-minimalist-tee",
    subtitle: "260 GSM Lightweight Drape Blank",
    price: 1499,
    originalPrice: 1799,
    badge: "CORE",
    hallmark: true,
    edition: "PERMANENT ARCHIVE",
    gsm: 260,
    fit: "Classic Raw-Hem",
    category: "Minimal Tees",
    tagline: "Laser-cut raw edge with hidden anti-fray stay stitch.",
    description: "Designed for minimal purists. Features a laser-cut raw bottom hem reinforced with interior blind stitching to prevent unraveling while ensuring a clean drape over denim or cargo trousers.",
    specs: {
      fabric: "100% Indian Supima Blend",
      weight: "260 GSM",
      origin: "Tirupur, Tamil Nadu",
      dyeMethod: "Reactive Deep Dye",
      collar: "Bonded Seamless Collar",
      stitch: "Laser Cut Edge + Invisible Stay"
    },
    colors: [
      { name: "Void Obsidian", hex: "#0E0E11", code: "black" },
      { name: "Concrete Graphite", hex: "#3F3F46", code: "grey" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 164,
    stock: 14,
    isNew: false,
    featured: false,
    measurements: {
      S: { chest: "42 in", length: "28 in", shoulder: "20 in" },
      M: { chest: "44 in", length: "29 in", shoulder: "21 in" },
      L: { chest: "47 in", length: "30 in", shoulder: "22 in" },
      XL: { chest: "50 in", length: "31 in", shoulder: "23.5 in" }
    }
  },
  {
    id: "an-06",
    name: "06 ASHWATHA EMBROIDERED ARCHIVE",
    slug: "ashwatha-embroidered-archive",
    subtitle: "310 GSM French Terry with Nape Crest",
    price: 2699,
    originalPrice: 3199,
    badge: "HALLMARK ARCHIVE",
    hallmark: true,
    edition: "ATELIER DROP / LIMITED",
    gsm: 310,
    fit: "Boxy Drop-Shoulder",
    category: "Premium Collection",
    tagline: "Micro-embroidered crimson red Devanagari signature on chest & nape.",
    description: "Embroidered using high-density Madeira red thread on the chest and center nape. Crafted from heavy French Terry jersey with a looped interior that regulates temperature across warm Mumbai days and cold Delhi nights.",
    specs: {
      fabric: "100% Indian French Terry Cotton",
      weight: "310 GSM",
      origin: "Ludhiana, Punjab",
      dyeMethod: "Pigment Overdyed Charcoal",
      collar: "1.3\" Dense Rib",
      stitch: "Satin Stitch Embroidery"
    },
    colors: [
      { name: "Void Obsidian", hex: "#0E0E11", code: "black" },
      { name: "Blood Crimson", hex: "#FF1E27", code: "red" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 5.0,
    reviewCount: 78,
    stock: 5,
    isNew: true,
    featured: true,
    measurements: {
      S: { chest: "44 in", length: "28 in", shoulder: "21 in" },
      M: { chest: "46 in", length: "29 in", shoulder: "22 in" },
      L: { chest: "49 in", length: "30 in", shoulder: "23 in" },
      XL: { chest: "52 in", length: "31 in", shoulder: "24.5 in" }
    }
  },
  {
    id: "an-07",
    name: "07 BRUTALIST DESI GRID TEE",
    slug: "brutalist-desi-grid-tee",
    subtitle: "300 GSM Heavyweight Matte Silicone",
    price: 2199,
    originalPrice: 2499,
    badge: "NEW DROP",
    hallmark: true,
    edition: "VOL 01 / DESI BRUTALISM",
    gsm: 300,
    fit: "Boxy Drop-Shoulder",
    category: "Graphic Tees",
    tagline: "Matte silicone typography on flank: 'ANARTHAK // NOT LIKE THEM'.",
    description: "Modernist brutalism meets Indian street typography. The silicone print catches the light with matte precision without peeling or cracking. Holds crisp structure across all seasons.",
    specs: {
      fabric: "100% Combed Ring-Spun Cotton",
      weight: "300 GSM",
      origin: "Coimbatore, Tamil Nadu",
      dyeMethod: "Reactive Deep Black Wash",
      collar: "1.25\" Bound Neck",
      stitch: "Twin-Needle Interlock"
    },
    colors: [
      { name: "Void Obsidian", hex: "#0E0E11", code: "black" },
      { name: "Concrete Graphite", hex: "#3F3F46", code: "grey" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 65,
    stock: 7,
    isNew: true,
    featured: false,
    measurements: {
      XS: { chest: "42 in", length: "27.5 in", shoulder: "20 in" },
      S: { chest: "44 in", length: "28.5 in", shoulder: "21 in" },
      M: { chest: "46 in", length: "29.5 in", shoulder: "22 in" },
      L: { chest: "49 in", length: "30.5 in", shoulder: "23.5 in" }
    }
  },
  {
    id: "an-08",
    name: "08 INDUS HEAVYWEIGHT LONG-SLEEVE",
    slug: "indus-heavyweight-long-sleeve",
    subtitle: "330 GSM Storm Cuff Knitwear Weight",
    price: 2499,
    originalPrice: 2899,
    badge: "BESTSELLER",
    hallmark: true,
    edition: "VOL 01 / WINTER STREET",
    gsm: 330,
    fit: "Relaxed Vintage",
    category: "Heavyweight",
    tagline: "Substantial 330 GSM jersey with elongated 2.5-inch ribbed storm cuffs.",
    description: "Heavier than ordinary tees, doubles as light knitwear. Built with high-recovery ribbed storm cuffs and extended torso proportions. Pairs effortlessly with raw denim or cargo pants.",
    specs: {
      fabric: "100% Indian Combed Cotton",
      weight: "330 GSM",
      origin: "Tirupur, Tamil Nadu",
      dyeMethod: "Yarn-Dyed Deep Charcoal",
      collar: "Heavy Rib Crew",
      stitch: "Coverstitched Seams"
    },
    colors: [
      { name: "Charcoal Smoke", hex: "#27272A", code: "charcoal" },
      { name: "Void Obsidian", hex: "#0E0E11", code: "black" },
      { name: "Blood Crimson", hex: "#FF1E27", code: "red" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 84,
    stock: 8,
    isNew: false,
    featured: false,
    measurements: {
      S: { chest: "44 in", length: "29 in", shoulder: "21 in" },
      M: { chest: "46 in", length: "30 in", shoulder: "22 in" },
      L: { chest: "49 in", length: "31 in", shoulder: "23.5 in" },
      XL: { chest: "52 in", length: "32 in", shoulder: "25 in" }
    }
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Drops", count: PRODUCTS.length },
  { id: "Heavyweight", name: "300+ GSM Heavyweight", count: 3 },
  { id: "Oversized", name: "Oversized Silhouettes", count: 2 },
  { id: "Graphic Tees", name: "Anarthak Graphics", count: 2 },
  { id: "Acid Washed", name: "Mineral & Acid Wash", count: 1 },
  { id: "Minimal Tees", name: "Minimalist Blanks", count: 1 },
  { id: "Premium Collection", name: "Numbered Editions", count: 1 }
];

export const FITS = [
  "Boxy Drop-Shoulder",
  "Oversized Drop-Shoulder",
  "Relaxed Vintage",
  "Classic Raw-Hem"
];

export const GSM_WEIGHTS = [
  { label: "260 GSM (Mid-Heavy)", value: 260 },
  { label: "280 GSM (Heavy)", value: 280 },
  { label: "290 GSM (Heavy)", value: 290 },
  { label: "300 GSM (Ultra Heavy)", value: 300 },
  { label: "320 GSM (Master)", value: 320 },
  { label: "340 GSM (Loopwheel)", value: 340 }
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const COLORS = [
  { name: "Void Obsidian", hex: "#0E0E11" },
  { name: "Blood Crimson", hex: "#FF1E27" },
  { name: "Concrete Graphite", hex: "#3F3F46" },
  { name: "Ash Charcoal", hex: "#27272A" },
  { name: "Chalk Off-White", hex: "#F4F4F6" }
];
