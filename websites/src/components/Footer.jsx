import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-surface-container w-full py-xl border-t border-outline-variant">
      <div className="flex flex-col md:flex-row gap-lg px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        {/* Brand Column */}
        <div className="flex-1 flex flex-col space-y-md min-w-0">
          <Link to="/" className="font-headline text-2xl md:text-3xl text-primary whitespace-nowrap w-fit">
            Vibe &amp; Thread
          </Link>
          <p className="text-style-body-md text-on-surface-variant md:max-w-[360px]">
            Elevating everyday aesthetics through intentional design and sustainable practices.
          </p>
        </div>

        {/* Links Column */}
        <div className="flex-shrink-0 flex flex-col space-y-sm md:px-xl">
          <Link className="text-style-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200" to="/collections/mens">
            Collections
          </Link>
          <Link className="text-style-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200" to="/collections/minimalist-essentials">
            Sustainability
          </Link>
          <Link className="text-style-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200" to="/collections/ethnic-luxe">
            Journal
          </Link>
          <Link className="text-style-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200" to="/cart">
            Shipping &amp; Returns
          </Link>
        </div>

        {/* Copyright Column */}
        <div className="flex-shrink-0 flex flex-col justify-end md:text-right">
          <span className="text-on-surface-variant text-sm">
            © 2024 Vibe &amp; Thread.<br />All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
