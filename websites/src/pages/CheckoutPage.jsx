import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PAKISTAN_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 
  'Hyderabad', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Jhang'
];

export default function CheckoutPage() {
  const { cartItems, cartCount, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('cod');
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
  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Zip Code Validation: max 5 chars, strictly numbers
    if (name === 'zip') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 5) {
        setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
      }
      return;
    }

    // Expiry Validation: Auto add slash for MM/YY
    if (name === 'expiry') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length >= 3) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
      }
      if (formatted.length <= 5) {
        setFormData((prev) => ({ ...prev, [name]: formatted }));
      }
      return;
    }

    // Card Number: strictly numbers, max 16
    if (name === 'cardNumber') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 16) {
        setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
      }
      return;
    }

    // CVC: strictly numbers, max 3
    if (name === 'cvc') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 3) {
        setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pass order data to success page to generate PDF
    const orderData = {
      orderId: 'VIBE-' + Math.floor(100000 + Math.random() * 900000),
      items: cartItems,
      subtotal,
      shipping,
      total,
      customer: formData,
      paymentMethod
    };

    // Store in localStorage temporarily for the success page
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    clearCart();
    
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
              <div>
                <label className="block text-style-label-caps text-secondary mb-xs">Email Address <span className="text-error">*</span></label>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-md">
              <h2 className="text-style-headline-md text-primary border-b border-outline-variant pb-xs">Shipping Address</h2>
              
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block text-style-label-caps text-secondary mb-xs">First Name <span className="text-error">*</span></label>
                  <input required autoComplete="given-name" type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-style-label-caps text-secondary mb-xs">Last Name <span className="text-error">*</span></label>
                  <input required autoComplete="family-name" type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block text-style-label-caps text-secondary mb-xs">City <span className="text-error">*</span></label>
                  <select 
                    required 
                    name="city" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                    className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none bg-surface-container-lowest"
                  >
                    <option value="" disabled>Select a City</option>
                    {PAKISTAN_CITIES.sort().map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-style-label-caps text-secondary mb-xs">ZIP Code (5 Digits) <span className="text-error">*</span></label>
                  <input required type="text" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="ZIP Code" className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-style-label-caps text-secondary mb-xs">Address <span className="text-error">*</span></label>
                <input 
                  required 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  placeholder={formData.city ? "Street Address" : "Please select a city first"} 
                  disabled={!formData.city}
                  className={`w-full border border-outline-variant p-sm text-style-body-md outline-none ${!formData.city ? 'bg-surface-container cursor-not-allowed opacity-60' : 'focus:border-primary bg-surface-container-lowest'}`} 
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-md">
              <h2 className="text-style-headline-md text-primary border-b border-outline-variant pb-xs">Payment Method</h2>
              
              <div className="flex gap-md mb-md">
                <label className={`flex items-center gap-sm p-sm border cursor-pointer w-1/2 transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary-container/10' : 'border-outline-variant'}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-primary" />
                  <span className="text-style-body-md text-primary font-medium">Cash on Delivery</span>
                </label>
                
                <label className={`flex items-center gap-sm p-sm border cursor-pointer w-1/2 transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary-container/10' : 'border-outline-variant'}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-primary" />
                  <span className="text-style-body-md text-primary font-medium">Card Payment</span>
                </label>
              </div>

              {/* Card Details (Hidden if COD) */}
              {paymentMethod === 'card' && (
                <div className="space-y-md animate-fade-in border border-outline-variant p-md bg-surface-container-low">
                  <div>
                    <label className="block text-style-label-caps text-secondary mb-xs">Card Number <span className="text-error">*</span></label>
                    <input required type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="16 Digit Card Number" className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    <div>
                      <label className="block text-style-label-caps text-secondary mb-xs">Expiry Date <span className="text-error">*</span></label>
                      <input required type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM/YY" className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-style-label-caps text-secondary mb-xs">CVC <span className="text-error">*</span></label>
                      <input required type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} placeholder="123" className="w-full border border-outline-variant p-sm text-style-body-md focus:border-primary outline-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="w-full py-md text-style-button bg-primary text-on-primary hover:bg-primary-container transition-colors duration-300 cursor-pointer">
              Complete Order • Rs. {total.toLocaleString()}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-surface-container-low p-lg border border-outline-variant sticky top-[80px]">
            <h2 className="text-style-headline-md text-primary mb-lg">Order Summary ({cartCount})</h2>
            
            <div className="space-y-md border-b border-outline-variant pb-md mb-md max-h-[40vh] overflow-y-auto pr-xs">
              {cartItems.map(item => (
                <div key={item.id + item.size} className="flex gap-md">
                  <div className="w-[60px] h-[80px] bg-surface-container overflow-hidden flex-shrink-0">
                    {item.image && <img src={item.image} style={{ filter: item.filter }} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-style-body-md font-medium text-primary line-clamp-1">{item.name}</span>
                    <span className="text-xs text-on-surface-variant">Qty: {item.quantity} {item.size && `• Size: ${item.size}`}</span>
                    <span className="text-sm font-medium text-primary mt-xs">Rs. {(item.priceNum * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-sm text-style-body-md border-b border-outline-variant pb-md mb-md">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-primary">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Shipping</span>
                <span className="text-primary">{shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}</span>
              </div>
            </div>

            <div className="flex justify-between text-style-body-lg font-medium text-primary">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
