import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((sum, item) => sum + ((item.priceNum || 0) * item.quantity), 0);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-surface shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-md border-b border-outline-variant">
              <h2 className="text-style-title-lg">Your Cart</h2>
              <button onClick={closeCart} className="p-xs hover:bg-surface-variant rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-md space-y-md">
              {cartItems.length === 0 ? (
                <div className="text-center py-xl text-secondary">
                  Your cart is empty.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-md border-b border-outline-variant pb-md">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-surface-container" style={{ filter: item.filter }} />
                    ) : (
                      <div className="w-20 h-24 flex items-center justify-center bg-surface-container">
                        <span className="material-symbols-outlined text-outline-variant">image</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-style-body-md font-semibold">{item.name}</h3>
                      <p className="text-style-body-sm text-secondary">Size: {item.size}</p>
                      <p className="text-style-body-sm mt-xs">{item.price}</p>
                      <div className="flex items-center gap-xs mt-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-sm hover:bg-surface-variant"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-style-body-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-sm hover:bg-surface-variant"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-error hover:opacity-80 self-start"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-md border-t border-outline-variant bg-surface">
                <div className="flex justify-between mb-md text-style-title-md">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-on-primary py-sm text-style-label-caps hover:opacity-90 transition-opacity"
                >
                  Checkout
                </button>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/cart');
                  }}
                  className="w-full mt-sm border border-primary text-primary py-sm text-style-label-caps hover:bg-surface-variant transition-colors"
                >
                  View Full Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
