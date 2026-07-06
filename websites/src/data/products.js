export const products = [
  // Unstitched
  {
    id: 'unst-01',
    name: 'Premium Egyptian Cotton',
    category: 'unstitched',
    categoryLabel: 'Unstitched Fabrics',
    price: '$45.00',
    priceNum: 45.00,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
    alt: 'Folded premium cotton fabric',
    description: 'Experience unparalleled luxury with our 100% Egyptian Cotton unstitched fabric. Known for its breathability, subtle sheen, and supreme softness, this fabric ensures comfort throughout the day. Perfect for crafting a bespoke Kurta or Shalwar Kameez.',
    sizes: ['4.5 Meters'],
    details: ['100% Egyptian Cotton', 'Lightweight & Breathable', 'Shrink-resistant finish', 'Includes matching buttons']
  },
  {
    id: 'unst-02',
    name: 'Classic Wash & Wear',
    category: 'unstitched',
    categoryLabel: 'Unstitched Fabrics',
    price: '$35.00',
    priceNum: 35.00,
    image: 'https://images.unsplash.com/photo-1604136172384-a1e50868f0a0?auto=format&fit=crop&q=80&w=800',
    alt: 'Rolls of wash and wear fabric',
    description: 'Our signature Wash & Wear collection offers the ultimate convenience without compromising on style. The wrinkle-resistant blend maintains a crisp, fresh look all day, making it the ideal choice for everyday professional and casual wear.',
    sizes: ['4.5 Meters'],
    details: ['Premium Blended Fabric', 'Wrinkle-Resistant', 'Easy Iron Technology', 'All-season wear']
  },
  
  // Kurta Pajama
  {
    id: 'kp-01',
    name: 'Midnight Onyx Kurta Set',
    category: 'kurta-pajama',
    categoryLabel: 'Kurta Pajama',
    price: '$85.00',
    priceNum: 85.00,
    image: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=800',
    alt: 'Man wearing a stylish dark ethnic suit',
    description: 'A masterpiece of understated elegance. This deep midnight black Kurta Pajama set features a sleek mandarin collar, hidden placket, and perfectly tailored straight-cut trousers. Crafted from a soft cotton blend for maximum drape and comfort.',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['Premium Cotton Blend', 'Mandarin Collar', 'Includes matching trouser', 'Dry clean recommended']
  },
  {
    id: 'kp-02',
    name: 'Ivory Classic Kurta Set',
    category: 'kurta-pajama',
    categoryLabel: 'Kurta Pajama',
    price: '$75.00',
    priceNum: 75.00,
    image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=800',
    alt: 'Man in a classic white kurta',
    description: 'The quintessential ivory white Kurta Pajama, an absolute wardrobe essential. Tailored with a relaxed yet refined fit, this set offers incredible breathability and a timeless aesthetic suitable for any formal or festive gathering.',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['100% Pure Cotton', 'Classic Fit', 'Breathable fabric', 'Machine washable on gentle']
  },

  // Waistcoats
  {
    id: 'wc-01',
    name: 'Textured Charcoal Waistcoat',
    category: 'waistcoats',
    categoryLabel: 'Waistcoats',
    price: '$65.00',
    priceNum: 65.00,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800',
    alt: 'Tailored charcoal waistcoat',
    description: 'Add a layer of sophistication to your traditional attire. This charcoal grey waistcoat features a subtle self-texture, a sleek band collar, and premium metallic buttons. The perfect complement to both light and dark Kurta Pajamas.',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['Textured TR Fabric', 'Premium Inner Lining', 'Metallic Buttons', 'Slim Fit Design']
  },

  // Fragrance
  {
    id: 'frag-01',
    name: 'Oud & Amber Signature',
    category: 'fragrance',
    categoryLabel: 'Fragrance',
    price: '$55.00',
    priceNum: 55.00,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    alt: 'Luxurious perfume bottle',
    description: 'A bold, commanding fragrance crafted for the modern gentleman. Opening with warm notes of rich amber and settling into a deep, luxurious Oud base. Designed to last over 12 hours and leave a memorable trail.',
    sizes: ['50ml', '100ml'],
    details: ['Eau de Parfum', 'Top notes: Amber, Saffron', 'Base notes: Pure Oud, Musk', 'Lasts 12+ hours']
  },
  {
    id: 'frag-02',
    name: 'Citrus Wood Essence',
    category: 'fragrance',
    categoryLabel: 'Fragrance',
    price: '$45.00',
    priceNum: 45.00,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=800',
    alt: 'Elegant cologne bottle',
    description: 'Fresh, vibrant, and incredibly sophisticated. Citrus Wood Essence opens with a burst of Italian bergamot and transitions into a smooth, masculine cedarwood finish. The perfect everyday signature scent.',
    sizes: ['50ml', '100ml'],
    details: ['Eau de Parfum', 'Top notes: Bergamot, Lemon', 'Base notes: Cedarwood, Vetiver', 'Perfect for daily wear']
  },

  // Accessories
  {
    id: 'acc-01',
    name: 'Onyx Enamel Cufflinks',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: '$25.00',
    priceNum: 25.00,
    image: 'https://images.unsplash.com/photo-1559564104-e3fb4b3e83b4?auto=format&fit=crop&q=80&w=800',
    alt: 'Luxury cufflinks',
    description: 'Complete your formal ethnic ensemble with these striking Onyx Enamel Cufflinks. Crafted from high-grade stainless steel with a polished silver finish and a deep black onyx inlay.',
    sizes: ['One Size'],
    details: ['Stainless Steel', 'Black Onyx Enamel', 'T-bar fastening', 'Comes in a luxury gift box']
  }
];

export const collectionsInfo = {
  unstitched: {
    name: 'Unstitched Fabrics',
    description: 'Premium quality unstitched fabrics crafted from the finest threads. Tailor your perfect fit with our exclusive cotton, wash & wear, and khaddar collections.',
  },
  'kurta-pajama': {
    name: 'Kurta Pajama',
    description: 'Traditional elegance meets modern tailoring. Explore our ready-to-wear Kurta Pajama sets designed for everyday comfort and festive occasions.',
  },
  waistcoats: {
    name: 'Waistcoats',
    description: 'Elevate your ethnic attire with our meticulously tailored waistcoats. Featuring classic textures, intricate details, and a timeless silhouette.',
  },
  fragrance: {
    name: 'Fragrance',
    description: 'Signature scents that define your presence. Discover our curated collection of long-lasting, captivating perfumes and attars.',
  },
  accessories: {
    name: 'Accessories',
    description: 'The perfect finishing touches. From elegant cufflinks to premium leather goods, complete your look with our crafted accessories.',
  }
};

export const categories = [
  {
    id: 'unstitched',
    slug: 'unstitched',
    name: 'Unstitched',
    description: 'Premium quality unstitched fabrics.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
    alt: 'Unstitched fabrics',
    filter: (p) => p.category === 'unstitched',
  },
  {
    id: 'kurta-pajama',
    slug: 'kurta-pajama',
    name: 'Kurta Pajama',
    description: 'Traditional elegance meets modern tailoring.',
    image: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=800',
    alt: 'Kurta Pajama',
    filter: (p) => p.category === 'kurta-pajama',
  },
  {
    id: 'waistcoats',
    slug: 'waistcoats',
    name: 'Waistcoats',
    description: 'Elevate your ethnic attire with our meticulously tailored waistcoats.',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800',
    alt: 'Waistcoats',
    filter: (p) => p.category === 'waistcoats',
  },
  {
    id: 'fragrance',
    slug: 'fragrance',
    name: 'Fragrance',
    description: 'Signature scents that define your presence.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    alt: 'Fragrance',
    filter: (p) => p.category === 'fragrance',
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function getProductsByCollection(slug) {
  if (slug === 'new-arrivals') return products;
  return products.filter((p) => p.category === slug);
}

export function getCollectionInfo(slug) {
  if (collectionsInfo[slug]) {
    return collectionsInfo[slug];
  }
  return { name: 'New Arrivals', description: 'The latest additions to our collection.' };
}
