const trustItems = [
  {
    id: 'free-shipping',
    icon: 'local_shipping',
    title: 'Free Shipping',
    description: 'Complimentary standard shipping on all orders over Rs. 5000.',
  },
  {
    id: 'easy-returns',
    icon: 'sync',
    title: 'Easy 30-Day Returns',
    description: 'Not quite right? Return it within 30 days for a full refund.',
  },
  {
    id: 'secure-checkout',
    icon: 'lock',
    title: '100% Secure Checkout',
    description: 'Your payment information is processed securely.',
  },
];

export default function TrustFooter() {
  return (
    <section id="trust-footer" className="bg-surface-container-lowest border-t border-outline-variant py-lg">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          {trustItems.map((item, index) => (
            <div
              key={item.id}
              id={`trust-${item.id}`}
              className={`flex flex-col items-center md:items-start space-y-sm py-sm md:py-0 ${
                index === 0 ? 'md:pr-lg' : index === 1 ? 'md:px-lg' : 'md:pl-lg'
              }`}
            >
              <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
              <h4 className="text-style-label-caps text-primary">{item.title}</h4>
              <p className="text-style-body-md text-on-surface-variant text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
