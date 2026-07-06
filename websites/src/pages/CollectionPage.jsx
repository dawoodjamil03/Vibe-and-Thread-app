import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductsByCollection, getCollectionInfo } from '../data/products';

export default function CollectionPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const [sortBy, setSortBy] = useState('featured');

  const collectionProducts = getProductsByCollection(slug);
  const info = getCollectionInfo(slug);

  const sortedProducts = [...collectionProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceNum - b.priceNum;
    if (sortBy === 'price-high') return b.priceNum - a.priceNum;
    return 0; // featured
  });

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: product.priceNum,
      image: product.image,
      filter: product.filter,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-md">
        <ol className="flex items-center gap-2 text-sm text-on-surface-variant">
          <li>
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <li><span className="material-symbols-outlined text-sm">chevron_right</span></li>
          <li className="text-primary font-medium">{info.name}</li>
        </ol>
      </nav>

      {/* Collection Header & Controls */}
      <div className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-lg">
        <div>
          <h1 className="text-style-headline-xl-mobile md:text-style-headline-lg text-primary mb-md">
            {info.name}
          </h1>
          <p className="text-style-body-lg text-on-surface-variant max-w-[600px]">
            {info.description}
          </p>
          <div className="mt-md text-style-label-caps text-secondary">
            {collectionProducts.length} {collectionProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>

        {/* Sort Dropdown */}
        {collectionProducts.length > 0 && (
          <div className="flex items-center gap-sm">
            <label htmlFor="sort-by" className="text-style-label-caps text-secondary">Sort by:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface-container border border-outline-variant text-style-body-md text-primary py-xs px-sm outline-none focus:border-primary cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter gap-y-xl">
        {sortedProducts.map((product) => (
          <div key={product.id} className="flex flex-col group">
            <Link
              to={`/product/${product.id}`}
              className="block w-full aspect-[4/5] bg-surface-container mb-md overflow-hidden relative"
            >
              <img
                className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                alt={product.alt}
                src={product.image}
                style={{ filter: product.filter }}
              />
            </Link>

            <Link to={`/product/${product.id}`} className="flex justify-between items-start mb-sm hover:opacity-80 transition-opacity">
              <h3 className="font-headline text-xl text-primary">{product.name}</h3>
              <span className="text-style-body-md text-on-surface-variant flex-shrink-0 ml-sm">{product.price}</span>
            </Link>

            <p className="text-sm text-on-surface-variant mb-md line-clamp-2">
              {product.description}
            </p>

            <button
              onClick={() => handleAddToCart(product)}
              className={`mt-auto w-full border text-style-button py-sm transition-colors duration-300 cursor-pointer ${
                addedId === product.id
                  ? 'bg-primary text-on-primary border-primary'
                  : 'border-primary text-primary hover:bg-primary hover:text-on-primary'
              }`}
            >
              {addedId === product.id ? '✓ Added to Bag' : 'Add to Bag'}
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {collectionProducts.length === 0 && (
        <div className="text-center py-xl">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-md block">inventory_2</span>
          <p className="text-style-body-lg text-on-surface-variant">No products in this collection yet.</p>
          <Link
            to="/"
            className="inline-block mt-lg text-style-button bg-primary text-on-primary py-sm px-lg hover:bg-primary-container transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      )}
    </section>
  );
}
