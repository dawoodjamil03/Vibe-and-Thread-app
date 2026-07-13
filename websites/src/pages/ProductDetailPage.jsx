import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductById } from '../data/products';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const product = getProductById(id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (product.category === 'fragrance') return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const getReviews = (category, productName) => {
    switch(category) {
      case 'unstitched':
        return [
          { author: "Ahmad K.", rating: 5, date: "2 days ago", text: `The fabric quality of the ${productName} is absolutely stunning. It feels premium and drapes beautifully.` },
          { author: "Zainab R.", rating: 5, date: "1 week ago", text: "Bought this unstitched fabric as a gift. The packaging and the material itself exceeded expectations." }
        ];
      case 'kurta-pajama':
        return [
          { author: "Bilal M.", rating: 5, date: "3 days ago", text: `The stitching on this ${productName} is flawless. Perfect fit and very comfortable to wear all day.` },
          { author: "Omar F.", rating: 4, date: "2 weeks ago", text: "Great material and classic look. The color matches the pictures perfectly." }
        ];
      case 'waistcoats':
        return [
          { author: "Saad T.", rating: 5, date: "1 day ago", text: `This waistcoat adds such a classy touch. The inner lining is very comfortable and the fit is tailored perfectly.` },
          { author: "Hassan Y.", rating: 5, date: "5 days ago", text: "Wore this to a wedding and got so many compliments. Exceptional craftsmanship!" }
        ];
      case 'fragrance':
        return [
          { author: "Tariq P.", rating: 5, date: "4 days ago", text: `The scent of ${productName} is long-lasting and very sophisticated. Definitely my new signature fragrance.` },
          { author: "Kamran A.", rating: 5, date: "1 month ago", text: "Incredible packaging and an even better smell. Not too overpowering but lasts all day." }
        ];
      case 'accessories':
        return [
          { author: "Faisal B.", rating: 5, date: "1 week ago", text: `Such a premium feel to this accessory. It completes my formal look perfectly.` },
          { author: "Usman Q.", rating: 4, date: "3 weeks ago", text: "Very high quality. You can tell a lot of attention to detail went into making this." }
        ];
      default:
        return [
          { author: "Ali R.", rating: 5, date: "Just now", text: "Excellent product, highly recommended!" }
        ];
    }
  };

  if (!product) {
    return (
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl text-center">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-md block">search_off</span>
        <h1 className="text-style-headline-md text-primary mb-md">Product Not Found</h1>
        <p className="text-style-body-lg text-on-surface-variant mb-lg">
          We couldn't find the product you're looking for.
        </p>
        <Link
          to="/"
          className="inline-block text-style-button bg-primary text-on-primary py-sm px-lg hover:bg-primary-container transition-colors duration-300"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: product.priceNum,
      image: product.image,
      filter: product.filter,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isWished = isInWishlist(product.id);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl"
    >
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-lg">
        <ol className="flex items-center gap-2 text-sm text-on-surface-variant">
          <li>
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <li><span className="material-symbols-outlined text-sm">chevron_right</span></li>
          <li>
            <Link
              to={`/collections/${product.category}`}
              className="hover:text-primary transition-colors"
            >
              {product.categoryLabel}
            </Link>
          </li>
          <li><span className="material-symbols-outlined text-sm">chevron_right</span></li>
          <li className="text-primary font-medium truncate max-w-[180px]">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Product Image */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-7"
        >
          <div 
            className={`aspect-[4/5] bg-surface-container overflow-hidden relative ${product.category !== 'fragrance' ? 'cursor-zoom-in' : ''}`}
            onMouseEnter={() => product.category !== 'fragrance' && setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <motion.img
              className="absolute inset-0 object-cover w-full h-full origin-center"
              alt={product.alt}
              src={product.image}
              style={{ filter: product.filter }}
              animate={
                isZooming && product.category !== 'fragrance'
                  ? { scale: 2, transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                  : { scale: 1, transformOrigin: '50% 50%' }
              }
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:col-span-5 flex flex-col gap-md pt-sm"
        >
          {/* Category label */}
          <Link
            to={`/collections/${product.category}`}
            className="text-style-label-caps text-secondary hover:text-primary transition-colors w-fit"
          >
            {product.categoryLabel}
          </Link>

          <div className="flex justify-between items-start gap-4">
            <h1 className="font-headline text-3xl md:text-4xl text-primary leading-tight">
              {product.name}
            </h1>
            <button
              onClick={() => toggleWishlist(product)}
              className={`text-primary hover:scale-110 transition-transform cursor-pointer ${isWished ? 'text-error' : ''}`}
              aria-label="Toggle Wishlist"
            >
              <span 
                className="material-symbols-outlined text-3xl"
                style={isWished ? { fontVariationSettings: "'FILL' 1" } : { fontVariationSettings: "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>

          <span className="text-style-body-lg text-on-surface-variant">{product.price}</span>

          {/* Description */}
          <p className="text-style-body-md text-on-surface-variant border-t border-outline-variant pt-md">
            {product.description}
          </p>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="pt-sm">
              <div className="flex justify-between items-center mb-sm">
                <span className="text-style-label-caps text-primary">
                  Size {selectedSize && <span className="text-secondary ml-xs">— {selectedSize}</span>}
                </span>
                <button 
                  onClick={() => alert('Size Guide:\nS: 36" Chest\nM: 38" Chest\nL: 40" Chest\nXL: 42" Chest')}
                  className="text-style-body-sm text-secondary underline hover:text-primary transition-colors cursor-pointer"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-sm">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-[48px] border text-style-button flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                      selectedSize === size
                        ? 'bg-primary text-on-primary border-primary'
                        : 'border-outline-variant text-primary hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="pt-sm">
            <span className="text-style-label-caps text-primary mb-sm block">Quantity</span>
            <div className="flex items-center border border-outline-variant w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-[48px] h-[48px] flex items-center justify-center text-primary hover:bg-surface-container transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <span className="material-symbols-outlined text-xl">remove</span>
              </button>
              <span className="w-[48px] h-[48px] flex items-center justify-center text-style-body-md text-primary border-x border-outline-variant">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-[48px] h-[48px] flex items-center justify-center text-primary hover:bg-surface-container transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <span className="material-symbols-outlined text-xl">add</span>
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.sizes && product.sizes.length > 0 && !selectedSize}
            className={`w-full py-md text-style-button transition-colors duration-300 cursor-pointer mt-sm ${
              added
                ? 'bg-primary text-on-primary'
                : product.sizes && product.sizes.length > 0 && !selectedSize
                  ? 'bg-surface-container text-on-surface-variant cursor-not-allowed'
                  : 'bg-primary text-on-primary hover:bg-primary-container'
            }`}
          >
            {added
              ? '✓ Added to Bag'
              : product.sizes && product.sizes.length > 0 && !selectedSize
                ? 'Select a Size'
                : 'Add to Bag'}
          </button>

          {/* View Bag link after adding */}
          {added && (
            <Link
              to="/cart"
              className="w-full py-sm text-style-button border border-primary text-primary text-center hover:bg-surface-container transition-colors duration-300 block"
            >
              View Bag
            </Link>
          )}

          {/* Accordions */}
          <div className="border-t border-outline-variant mt-lg">
            <details className="group border-b border-outline-variant" open>
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-md text-primary text-style-label-caps">
                <span>Details &amp; Care</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-on-surface-variant text-style-body-md pb-md animate-fade-in">
                <ul className="space-y-xs">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-xs">
                      <span className="material-symbols-outlined text-sm mt-1 text-secondary flex-shrink-0">check</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
            <details className="group border-b border-outline-variant">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-md text-primary text-style-label-caps">
                <span>Shipping &amp; Returns</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-on-surface-variant text-style-body-md pb-md animate-fade-in">
                <p className="mb-2">Free standard shipping on all orders over Rs. 5000.</p>
                <p>We accept returns within 30 days of delivery. Items must be unworn and unwashed with tags attached.</p>
              </div>
            </details>
          </div>

          {/* Continue Shopping */}
          <button
            onClick={() => navigate(-1)}
            className="mt-lg text-style-label-caps text-secondary hover:text-primary transition-colors cursor-pointer flex items-center gap-xs w-fit"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Continue Shopping
          </button>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-xl md:mt-[120px] pt-lg border-t border-outline-variant"
      >
        <h2 className="text-style-headline-md text-primary mb-md">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div>
            <div className="flex items-center gap-sm mb-sm">
              <h3 className="text-style-title-lg font-bold">4.8</h3>
              <div className="flex text-primary">
                <span className="material-symbols-outlined text-md">star</span>
                <span className="material-symbols-outlined text-md">star</span>
                <span className="material-symbols-outlined text-md">star</span>
                <span className="material-symbols-outlined text-md">star</span>
                <span className="material-symbols-outlined text-md">star_half</span>
              </div>
              <span className="text-style-body-sm text-secondary">(12 Reviews)</span>
            </div>
            <p className="text-style-body-md text-on-surface-variant max-w-[480px]">
              Our customers love the quality and craftsmanship of this piece. 
              Leave a review to let others know what you think!
            </p>
            <button className="mt-md border border-primary text-primary py-sm px-lg text-style-label-caps hover:bg-surface-variant transition-colors">
              Write a Review
            </button>
          </div>
          <div className="space-y-md">
            {getReviews(product.category, product.name).map((review, idx) => (
              <div key={idx} className="bg-surface-container p-md rounded-sm">
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-semibold text-style-label-caps">{review.author}</span>
                  <span className="text-style-body-sm text-secondary">{review.date}</span>
                </div>
                <div className="flex text-primary mb-sm">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">star</span>
                  ))}
                </div>
                <p className="text-style-body-md text-on-surface-variant">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
