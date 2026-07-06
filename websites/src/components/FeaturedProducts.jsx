import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';
import { motion } from 'framer-motion';

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
      filter: product.filter,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="flex flex-col gap-xl md:gap-[120px] pb-xl md:pb-[120px]">
      {categories.map((category) => {
        const categoryProducts = products.filter((p) => p.category === category.slug);

        return (
          <section
            key={category.id}
            id={`category-${category.slug}`}
            className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin-desktop"
          >
            <div className="flex justify-between items-end mb-lg border-b border-outline-variant pb-md">
              <h2 className="text-style-headline-lg text-primary">{category.name}</h2>
              <Link
                className="text-style-label-caps text-secondary hover:text-primary transition-colors underline"
                to={`/collections/${category.slug}`}
              >
                View All
              </Link>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-gutter pb-md [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {categoryProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="flex flex-col group min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full aspect-[4/5] bg-surface-container mb-md overflow-hidden relative"
                  >
                    <img
                      className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      alt={product.alt}
                      src={product.image}
                      style={{ filter: product.filter }}
                    />
                  </Link>
                  <Link to={`/product/${product.id}`} className="flex justify-between items-start mb-sm hover:opacity-80 transition-opacity">
                    <h3 className="font-headline text-xl text-primary">{product.name}</h3>
                    <span className="text-style-body-md text-on-surface-variant ml-sm">{product.price}</span>
                  </Link>
                  <button
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
          </section>
        );
      })}
    </div>
  );
}
