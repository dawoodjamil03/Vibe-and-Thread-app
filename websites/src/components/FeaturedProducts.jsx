import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

// Show only the first 4 products on the home page
const featuredProducts = products.slice(0, 4);

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: product.priceNum,
      image: product.image,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section
      id="featured-products"
      className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-[120px]"
    >
      <div className="flex justify-between items-end mb-lg border-b border-outline-variant pb-md">
        <h2 className="text-style-headline-lg text-primary">Featured Arrivals</h2>
        <Link
          className="text-style-label-caps text-secondary hover:text-primary transition-colors underline hidden md:block"
          to="/collections/new-arrivals"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter gap-y-xl">
        {featuredProducts.map((product) => (
          <div key={product.id} id={`product-${product.id}`} className="flex flex-col group">
            <Link
              to={`/product/${product.id}`}
              className="block w-full aspect-[4/5] bg-surface-container mb-md overflow-hidden relative"
            >
              <img
                className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-90"
                alt={product.alt}
                src={product.image}
              />
            </Link>
            <Link to={`/product/${product.id}`} className="flex justify-between items-start mb-sm hover:opacity-80 transition-opacity">
              <h3 className="font-headline text-xl text-primary">{product.name}</h3>
              <span className="text-style-body-md text-on-surface-variant">{product.price}</span>
            </Link>
            <button
              id={`add-to-bag-${product.id}`}
              onClick={() => handleAddToCart(product)}
              className={`mt-auto w-full border text-style-button py-sm transition-colors cursor-pointer ${
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

      <div className="mt-xl text-center md:hidden">
        <Link
          className="text-style-label-caps text-secondary hover:text-primary transition-colors underline"
          to="/collections/new-arrivals"
        >
          View All Arrivals
        </Link>
      </div>
    </section>
  );
}
