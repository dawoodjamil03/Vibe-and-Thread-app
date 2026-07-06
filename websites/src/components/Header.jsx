import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';

export default function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Show max 5 results

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

  const handleAccountClick = () => {
    if (user) {
      logout();
    } else {
      navigate('/login', { state: { from: location } });
    }
    closeMobileMenu();
  };

  const handleCartClick = () => {
    if (user) {
      navigate('/cart');
    } else {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
    }
    closeMobileMenu();
  };

  return (
    <header
      id="main-header"
      className="bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant sticky top-0 w-full z-40 transition-all"
    >
      {/* Search Overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-[64px] bg-surface-container-lowest flex items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto transition-all duration-300 ${
          searchOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
        style={{ zIndex: 10 }}
      >
        <span className="material-symbols-outlined text-on-surface-variant mr-sm">search</span>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Search Results Dropdown */}
        {searchOpen && searchQuery && (
          <div className="absolute top-[64px] left-0 w-full bg-surface-container-lowest border-t border-outline-variant shadow-lg max-h-[60vh] overflow-y-auto">
            <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-md flex flex-col">
              {searchResults.length > 0 ? (
                <>
                  <span className="text-style-label-caps text-secondary mb-sm">Products</span>
                  {searchResults.map(product => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(`/product/${product.id}`);
                      }}
                      className="flex items-center gap-md py-sm hover:bg-surface-container transition-colors text-left group cursor-pointer"
                    >
                      <div className="w-[40px] h-[50px] bg-surface-container overflow-hidden flex-shrink-0">
                        {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-style-body-md font-medium text-primary group-hover:underline">{product.name}</span>
                        <span className="text-sm text-secondary">{product.price}</span>
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="py-xl text-center text-on-surface-variant text-style-body-md">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}
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
          className="flex items-center gap-xs text-style-headline-md tracking-tighter text-primary flex-shrink-0"
          to="/"
        >
          {/* Custom SVG Logo */}
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="currentColor" />
            <path d="M12 14L20 28L28 14" stroke="var(--color-on-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 10V18" stroke="var(--color-on-primary)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline-block">Vibe &amp; Thread</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex space-x-md text-style-label-caps">
          <NavLink className={navLinkClass} to="/">
            Home
          </NavLink>
          <NavLink className={navLinkClass} to="/collections/unstitched">
            Unstitched
          </NavLink>
          <NavLink className={navLinkClass} to="/collections/kurta-pajama">
            Kurta Pajama
          </NavLink>
          <NavLink className={navLinkClass} to="/collections/waistcoats">
            Waistcoats
          </NavLink>
          <NavLink className={navLinkClass} to="/collections/fragrance">
            Fragrance
          </NavLink>
          <NavLink className={navLinkClass} to="/collections/accessories">
            Accessories
          </NavLink>
        </nav>

        {/* Trailing Icons */}
        <div className="flex items-center space-x-md text-primary">
          <button
            id="search-toggle"
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer hidden sm:block"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <button
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer hidden sm:block"
            aria-label="Wishlist"
          >
            <span className="material-symbols-outlined">favorite_border</span>
          </button>
          <button
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer hidden sm:block"
            aria-label={user ? 'Logout' : 'Account'}
            title={user ? 'Logout' : 'Login'}
            onClick={handleAccountClick}
          >
            <span className="material-symbols-outlined">{user ? 'logout' : 'person'}</span>
          </button>
          <button
            id="cart-button"
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer flex items-center gap-1"
            aria-label="Shopping bag"
            onClick={handleCartClick}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="text-style-label-caps font-medium">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden bg-surface-container-lowest border-t border-outline-variant overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[400px] py-sm' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col space-y-sm px-margin-mobile text-style-label-caps">
          <NavLink className={mobileNavLinkClass} to="/" onClick={closeMobileMenu}>
            Home
          </NavLink>
          <NavLink className={mobileNavLinkClass} to="/collections/unstitched" onClick={closeMobileMenu}>
            Unstitched
          </NavLink>
          <NavLink className={mobileNavLinkClass} to="/collections/kurta-pajama" onClick={closeMobileMenu}>
            Kurta Pajama
          </NavLink>
          <NavLink className={mobileNavLinkClass} to="/collections/waistcoats" onClick={closeMobileMenu}>
            Waistcoats
          </NavLink>
          <NavLink className={mobileNavLinkClass} to="/collections/fragrance" onClick={closeMobileMenu}>
            Fragrance
          </NavLink>
          <NavLink className={mobileNavLinkClass} to="/collections/accessories" onClick={closeMobileMenu}>
            Accessories
          </NavLink>
          
          <div className="flex items-center gap-md pt-md mt-sm border-t border-outline-variant">
            <button
              onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }}
              className="text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer flex flex-col items-center"
              aria-label="Search"
            >
              <span className="material-symbols-outlined mb-1">search</span>
              <span className="text-[10px]">Search</span>
            </button>
            <button
              className="text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer flex flex-col items-center"
              aria-label="Wishlist"
            >
              <span className="material-symbols-outlined mb-1">favorite_border</span>
              <span className="text-[10px]">Wishlist</span>
            </button>
            <button
              className="text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer flex flex-col items-center"
              aria-label={user ? 'Logout' : 'Account'}
              onClick={handleAccountClick}
            >
              <span className="material-symbols-outlined mb-1">{user ? 'logout' : 'person'}</span>
              <span className="text-[10px]">{user ? 'Logout' : 'Account'}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
