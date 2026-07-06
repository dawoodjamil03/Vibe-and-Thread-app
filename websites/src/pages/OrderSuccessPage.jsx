import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function OrderSuccessPage() {
  const { cartItems, clearCart } = useCart();

  // Clear cart upon successful order load
  useEffect(() => {
    if (cartItems.length > 0) {
      clearCart();
    }
  }, [cartItems.length, clearCart]);

  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-[120px] text-center min-h-[60vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
      >
        <span className="material-symbols-outlined text-[80px] text-primary mb-md block">check_circle</span>
      </motion.div>
      <motion.h1 
        className="text-style-headline-lg text-primary mb-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Thank You For Your Order
      </motion.h1>
      <motion.p 
        className="text-style-body-lg text-on-surface-variant max-w-[500px] mb-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Your order #VIBE-{Math.floor(100000 + Math.random() * 900000)} has been successfully placed. We've sent a confirmation email with your order details.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/"
          className="inline-block text-style-button bg-primary text-on-primary py-sm px-xl hover:bg-primary-container transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </section>
  );
}
