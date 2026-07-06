import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shippingMessage =
    subtotal >= freeShippingThreshold
      ? 'You qualify for free shipping!'
      : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for free shipping`;

  if (cartItems.length === 0) {
    return (
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <h1 className="text-style-headline-lg text-primary mb-xl">Your Bag</h1>
        <div className="text-center py-xl border border-outline-variant">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-md block">shopping_bag</span>
          <p className="text-style-body-lg text-on-surface-variant mb-sm">Your bag is empty</p>
          <p className="text-style-body-md text-secondary mb-lg">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="inline-block text-style-button bg-primary text-on-primary py-sm px-lg hover:bg-primary-container transition-colors duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-md">
        <ol className="flex items-center gap-2 text-sm text-on-surface-variant">
          <li>
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <li><span className="material-symbols-outlined text-sm">chevron_right</span></li>
          <li className="text-primary font-medium">Your Bag</li>
        </ol>
      </nav>

      <h1 className="text-style-headline-lg text-primary mb-sm">Your Bag</h1>
      <p className="text-style-body-md text-on-surface-variant mb-lg">
        {cartCount} {cartCount === 1 ? 'item' : 'items'}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="border-t border-outline-variant">
            {cartItems.map((item) => (
              <div
                key={item.id + (item.size || '')}
                className="flex gap-md py-lg border-b border-outline-variant"
              >
                {/* Product Image */}
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <div className="w-[120px] h-[150px] bg-surface-container overflow-hidden">
                    {item.image ? (
                      <img
                        className="object-cover w-full h-full"
                        alt={item.name}
                        src={item.image}
                        style={{ filter: item.filter }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-outline-variant">image</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start gap-sm">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-headline text-lg text-primary hover:opacity-80 transition-opacity block"
                      >
                        {item.name}
                      </Link>
                      {item.size && (
                        <span className="text-sm text-on-surface-variant">Size: {item.size}</span>
                      )}
                    </div>
                    <span className="text-style-body-md text-primary flex-shrink-0 font-medium">
                      ${(item.priceNum * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-md">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-outline-variant">
                      <button
                        onClick={() => {
                          if (item.quantity <= 1) {
                            removeFromCart(item.id, item.size);
                          } else {
                            updateQuantity(item.id, item.size, item.quantity - 1);
                          }
                        }}
                        className="w-[36px] h-[36px] flex items-center justify-center text-primary hover:bg-surface-container transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <span className="material-symbols-outlined text-lg">remove</span>
                      </button>
                      <span className="w-[36px] h-[36px] flex items-center justify-center text-sm text-primary border-x border-outline-variant">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-[36px] h-[36px] flex items-center justify-center text-primary hover:bg-surface-container transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <span className="material-symbols-outlined text-lg">add</span>
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-sm text-secondary hover:text-error transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <Link
            to="/"
            className="mt-lg text-style-label-caps text-secondary hover:text-primary transition-colors flex items-center gap-xs w-fit"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-low p-lg border border-outline-variant sticky top-[80px]">
            <h2 className="text-style-headline-md text-primary mb-lg">Order Summary</h2>

            <div className="space-y-sm border-b border-outline-variant pb-md mb-md">
              <div className="flex justify-between text-style-body-md">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-style-body-md">
                <span className="text-on-surface-variant">Shipping</span>
                <span className="text-primary">
                  {subtotal >= freeShippingThreshold ? 'Free' : 'Calculated at checkout'}
                </span>
              </div>
            </div>

            {/* Shipping Progress */}
            <div className="mb-md">
              <div className="flex items-center gap-xs text-sm mb-xs">
                <span className="material-symbols-outlined text-sm text-secondary">local_shipping</span>
                <span className={`${subtotal >= freeShippingThreshold ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  {shippingMessage}
                </span>
              </div>
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-style-body-lg font-medium border-t border-outline-variant pt-md mb-lg">
              <span className="text-primary">Estimated Total</span>
              <span className="text-primary">${subtotal.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-md text-style-button bg-primary text-on-primary hover:bg-primary-container transition-colors duration-300 cursor-pointer"
            >
              Proceed to Checkout
            </button>

            <p className="text-xs text-on-surface-variant text-center mt-md">
              Taxes calculated at checkout. Free returns within 30 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
