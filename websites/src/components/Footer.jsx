import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-surface-container w-full py-xl border-t border-outline-variant">
      <div className="flex flex-col md:flex-row gap-xl md:gap-lg px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto justify-between">
        
        {/* Brand Column */}
        <div className="flex-1 flex flex-col space-y-md min-w-0 max-w-[400px]">
          <Link to="/" className="flex items-center gap-xs text-style-headline-md tracking-tighter text-primary flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="currentColor" />
              <path d="M12 14L20 28L28 14" stroke="var(--color-on-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 10V18" stroke="var(--color-on-primary)" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span>Vibe &amp; Thread</span>
          </Link>
          <p className="text-style-body-md text-on-surface-variant">
            Discover our premium range of unstitched fabrics, signature fragrances, and curated accessories designed to elevate your everyday style.
          </p>
        </div>

        {/* Links Column */}
        <div className="flex-shrink-0 flex flex-col space-y-sm">
          <span className="text-style-label-caps text-primary mb-xs font-semibold">Shop</span>
          <Link className="text-style-body-md text-on-surface-variant hover:text-primary transition-colors duration-200" to="/collections/unstitched">
            Unstitched Fabrics
          </Link>
          <Link className="text-style-body-md text-on-surface-variant hover:text-primary transition-colors duration-200" to="/collections/kurta-pajama">
            Kurta Pajama
          </Link>
          <Link className="text-style-body-md text-on-surface-variant hover:text-primary transition-colors duration-200" to="/collections/fragrance">
            Signature Fragrances
          </Link>
          <Link className="text-style-body-md text-on-surface-variant hover:text-primary transition-colors duration-200" to="/collections/accessories">
            Curated Accessories
          </Link>
        </div>

        {/* Newsletter Column */}
        <div className="flex-shrink-0 flex flex-col space-y-sm w-full md:w-[320px]">
          <span className="text-style-label-caps text-primary mb-xs font-semibold">Stay Connected</span>
          <p className="text-style-body-md text-on-surface-variant">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form className="flex mt-sm" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-surface-container-lowest border border-outline-variant px-sm py-xs flex-grow focus:outline-none focus:border-primary text-sm"
              required 
            />
            <button type="submit" className="bg-primary text-on-primary px-md py-xs text-style-button hover:bg-primary-container transition-colors">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-xl pt-lg border-t border-outline-variant px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-sm">
        <span className="text-on-surface-variant text-sm">
          © {new Date().getFullYear()} Vibe &amp; Thread. All rights reserved.
        </span>
        <div className="flex space-x-md text-on-surface-variant text-sm">
          <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
