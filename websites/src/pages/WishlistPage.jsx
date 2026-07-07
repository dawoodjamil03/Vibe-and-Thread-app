import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl text-center min-h-[50vh] flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-[64px] text-secondary mb-md">favorite_border</span>
        <h1 className="text-style-headline-lg text-primary mb-md">Your Wishlist is Empty</h1>
        <p className="text-style-body-lg text-on-surface-variant mb-lg">Save items you love to view them later.</p>
        <Link to="/" className="text-style-button bg-primary text-on-primary py-sm px-lg hover:bg-primary-container transition-colors">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
      <h1 className="text-style-headline-lg text-primary mb-xl text-center">Your Wishlist</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md md:gap-lg">
        {wishlistItems.map((product) => (
          <div key={product.id} className="group relative flex flex-col">
            <Link to={`/product/${product.id}`} className="relative bg-surface-container overflow-hidden aspect-[3/4] mb-sm">
              <img
                src={product.image}
                alt={product.name}
                style={{ filter: product.filter }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Remove from wishlist button overlay */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeFromWishlist(product.id);
                }}
                className="absolute top-sm right-sm bg-surface-container-lowest/80 p-xs rounded-full hover:bg-error hover:text-on-error transition-colors z-10 cursor-pointer"
                aria-label="Remove from wishlist"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </Link>
            
            <div className="flex flex-col flex-grow">
              <Link to={`/product/${product.id}`} className="text-style-body-md font-medium text-primary hover:opacity-70 transition-opacity line-clamp-1">
                {product.name}
              </Link>
              <div className="flex justify-between items-center mt-xs">
                <span className="text-secondary text-sm">{product.categoryLabel}</span>
                <span className="text-style-body-md font-medium">Rs. {product.priceNum.toLocaleString()}</span>
              </div>
            </div>
            
            <Link 
              to={`/product/${product.id}`}
              className="mt-sm w-full border border-primary text-primary text-center text-style-button py-sm hover:bg-surface-container transition-colors cursor-pointer"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
