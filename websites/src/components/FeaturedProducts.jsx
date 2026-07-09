import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

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
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex overflow-x-auto snap-x snap-mandatory gap-gutter pb-md [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {categoryProducts.map((product) => (
                <motion.div 
                  variants={itemVariants}
                  key={product.id} 
                  className="flex flex-col group min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start relative"
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
                    <div className="absolute bottom-0 left-0 right-0 p-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                        className="w-full bg-primary/90 backdrop-blur-sm text-on-primary py-sm text-style-label-caps hover:bg-primary transition-colors"
                      >
                        {addedId === product.id ? '✓ Added' : 'Quick Add'}
                      </button>
                    </div>
                  </Link>
                  <Link to={`/product/${product.id}`} className="flex justify-between items-start mb-sm hover:opacity-80 transition-opacity">
                    <h3 className="font-headline text-xl text-primary">{product.name}</h3>
                    <span className="text-style-body-md text-on-surface-variant ml-sm">{product.price}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>
        );
      })}
    </div>
  );
}
