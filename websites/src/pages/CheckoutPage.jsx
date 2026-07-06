import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cartItems, cartCount } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : 10;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order processing
    navigate('/order-success');
  };

  if (cartItems.length === 0) {
    return (
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl text-center">
        <h1 className="text-style-headline-lg text-primary mb-md">Checkout</h1>
        <p className="text-style-body-lg text-on-surface-variant mb-lg">Your bag is empty.</p>
        <Link to="/" className="text-style-button bg-primary text-on-primary py-sm px-lg hover:bg-primary-container transition-colors">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
      <h1 className="text-style-headline-lg text-primary mb-xl text-center">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-xl">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-xl">
            {/* Contact Info */}
            <div className="space-y-md">
              <h2 className="text-style-headline-md text-primary border-b border-outline-variant pb-xs">Contact Information</h2>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none"
              />
            </div>

            {/* Shipping Address */}
            <div className="space-y-md">
              <h2 className="text-style-headline-md text-primary border-b border-outline-variant pb-xs">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-md">
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
              </div>
              <input required type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
              <div className="grid grid-cols-2 gap-md">
                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
                <input required type="text" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="ZIP Code" className="border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
              </div>
            </div>

            {/* Payment (Mock) */}
            <div className="space-y-md">
              <h2 className="text-style-headline-md text-primary border-b border-outline-variant pb-xs">Payment Details</h2>
              <input required type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="Card Number" className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
              <div className="grid grid-cols-2 gap-md">
                <input required type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM/YY" className="border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
                <input required type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} placeholder="CVC" className="border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
              </div>
            </div>

            <button type="submit" className="w-full py-md text-style-button bg-primary text-on-primary hover:bg-primary-container transition-colors duration-300 cursor-pointer">
              Complete Order • ${total.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-surface-container-low p-lg border border-outline-variant sticky top-[80px]">
            <h2 className="text-style-headline-md text-primary mb-lg">Order Summary ({cartCount})</h2>
            
            <div className="space-y-md border-b border-outline-variant pb-md mb-md max-h-[40vh] overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id + item.size} className="flex gap-md">
                  <div className="w-[60px] h-[80px] bg-surface-container overflow-hidden flex-shrink-0">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-style-body-md font-medium text-primary line-clamp-1">{item.name}</span>
                    <span className="text-sm text-on-surface-variant">Qty: {item.quantity} {item.size && `• Size: ${item.size}`}</span>
                    <span className="text-sm font-medium text-primary mt-xs">${(item.priceNum * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-sm text-style-body-md border-b border-outline-variant pb-md mb-md">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Shipping</span>
                <span className="text-primary">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="flex justify-between text-style-body-lg font-medium text-primary">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
