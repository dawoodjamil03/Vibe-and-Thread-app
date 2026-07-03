import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const navLinkClass = ({ isActive }) =>
    `transition-opacity duration-200 ${
      isActive
        ? 'text-primary border-b border-primary pb-1 font-semibold'
        : 'text-secondary hover:opacity-70'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `py-xs transition-opacity duration-200 ${
      isActive ? 'text-primary font-semibold' : 'text-secondary hover:opacity-70'
    }`;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      id="main-header"
      className="bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant sticky top-0 w-full z-40 transition-all"
    >
      {/* Search Overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-surface-container-lowest flex items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto transition-all duration-300 ${
          searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 10 }}
      >
        <span className="material-symbols-outlined text-on-surface-variant mr-sm">search</span>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search products, categories..."
          className="flex-1 bg-transparent border-none outline-none text-style-body-md text-on-surface placeholder:text-on-surface-variant"
        />
        <button
          onClick={() => setSearchOpen(false)}
          className="text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          aria-label="Close search"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Leading Icon (Mobile Menu) */}
        <button
          id="mobile-menu-toggle"
          className="lg:hidden text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>

        {/* Brand Logo */}
        <Link
          id="brand-logo"
          className="text-style-headline-md tracking-tighter text-primary flex-shrink-0"
          to="/"
        >
          Vibe &amp; Thread
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex space-x-lg text-style-label-caps">
          <NavLink className={navLinkClass} to="/collections/new-arrivals">
            New Arrivals
          </NavLink>
          <NavLink className={navLinkClass} to="/collections/mens">
            Collections
          </NavLink>
          <NavLink className={navLinkClass} to="/collections/minimalist-essentials">
            Sustainability
          </NavLink>
          <NavLink className={navLinkClass} to="/collections/ethnic-luxe">
            Journal
          </NavLink>
        </nav>

        {/* Trailing Icons */}
        <div className="flex items-center space-x-md text-primary">
          <button
            id="search-toggle"
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer hidden lg:block"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <button
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer hidden lg:block"
            aria-label="Account"
          >
            <span className="material-symbols-outlined">person</span>
          </button>
          <button
            id="cart-button"
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer flex items-center gap-2"
            aria-label="Shopping bag"
            onClick={() => navigate('/cart')}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="text-style-label-caps hidden lg:inline">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden bg-surface-container-lowest border-t border-outline-variant overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-60 py-sm' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col space-y-sm px-margin-mobile text-style-label-caps">
          <NavLink className={mobileNavLinkClass} to="/collections/new-arrivals" onClick={closeMobileMenu}>
            New Arrivals
          </NavLink>
          <NavLink className={mobileNavLinkClass} to="/collections/mens" onClick={closeMobileMenu}>
            Collections
          </NavLink>
          <NavLink className={mobileNavLinkClass} to="/collections/minimalist-essentials" onClick={closeMobileMenu}>
            Sustainability
          </NavLink>
          <NavLink className={mobileNavLinkClass} to="/collections/ethnic-luxe" onClick={closeMobileMenu}>
            Journal
          </NavLink>
          <div className="flex items-center gap-md pt-xs border-t border-outline-variant">
            <button
              onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }}
              className="text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
              aria-label="Search"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
            <button
              className="text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
              aria-label="Account"
            >
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
