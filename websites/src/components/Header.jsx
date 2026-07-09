import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { categories } from '../data/products';
import { fuzzySearch } from '../lib/search';
import { motion } from 'framer-motion';

export default function Header() {
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  
  const [activeSection, setActiveSection] = useState('home');
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  // ── Scroll Spy: track which category section is visible ──
  useEffect(() => {
    if (!isHomePage) {
      // On collection pages, highlight matching category
      const match = location.pathname.match(/^\/collections\/(.+)/);
      setActiveSection(match ? match[1] : '');
      return;
    }

    const handleScroll = () => {
      // At the very top → home
      if (window.scrollY < 300) {
        setActiveSection('home');
        return;
      }

      // Walk through each section and find the one whose top is closest to (but above) the viewport midpoint
      let bestSection = 'home';
      const viewportMid = window.innerHeight * 0.35;

      for (const category of categories) {
        const el = document.getElementById(`category-${category.slug}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Section is in view if its top is above the midpoint and its bottom is below the midpoint
          if (rect.top <= viewportMid && rect.bottom > viewportMid) {
            bestSection = category.slug;
          }
        }
      }

      setActiveSection(bestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, location.pathname]);

  // ── Fuzzy search ──
  const searchResults = fuzzySearch(searchQuery, 6);

  // ── Smooth scroll to a category section on the homepage ──
  const scrollToSection = useCallback((slug) => {
    if (slug === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(`category-${slug}`);
    if (el) {
      const headerOffset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  // ── Handle nav click: scroll if on homepage, navigate otherwise ──
  const handleNavClick = useCallback((slug) => {
    setMobileMenuOpen(false);

    if (isHomePage) {
      // Already on homepage → just smooth scroll
      scrollToSection(slug);
    } else if (slug === 'home') {
      // Navigate to homepage
      navigate('/');
    } else {
      // Navigate to collection page
      navigate(`/collections/${slug}`);
    }
  }, [isHomePage, navigate, scrollToSection]);

  // ── Style helpers ──
  const getNavClass = (slug) => {
    const isActive = activeSection === slug;
    return `relative transition-all duration-200 cursor-pointer ${
      isActive
        ? 'text-primary font-semibold'
        : 'text-secondary hover:text-primary hover:opacity-80'
    }`;
  };

  const getMobileNavClass = (slug) => {
    const isActive = activeSection === slug;
    return `py-xs transition-all duration-200 cursor-pointer ${
      isActive ? 'text-primary font-semibold' : 'text-secondary hover:text-primary'
    }`;
  };

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
    openCart();
    closeMobileMenu();
  };
  
  const handleWishlistClick = () => {
    // Wishlist works without login (uses localStorage)
    navigate('/wishlist');
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
                        {product.image && <img src={product.image} style={{ filter: product.filter }} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-style-body-md font-medium text-primary group-hover:underline">{product.name}</span>
                        <span className="text-sm text-secondary">Rs. {product.priceNum.toLocaleString()}</span>
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

      {/* Main Header Bar */}
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <button
          id="mobile-menu-toggle"
          className="lg:hidden text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>

        <Link
          id="brand-logo"
          className="flex items-center gap-xs text-style-headline-md tracking-tighter text-primary flex-shrink-0"
          to="/"
          onClick={() => { if (isHomePage) scrollToSection('home'); }}
        >
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="currentColor" />
            <path d="M12 14L20 28L28 14" stroke="var(--color-on-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 10V18" stroke="var(--color-on-primary)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline-block">Vibe &amp; Thread</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-md text-style-label-caps">
          {[{ slug: 'home', name: 'Home' }, ...categories].map(cat => (
            <button
              key={cat.slug}
              className={`${getNavClass(cat.slug)} py-1 px-1`}
              onClick={() => handleNavClick(cat.slug)}
            >
              {cat.name}
              {activeSection === cat.slug && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Icons */}
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
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer hidden sm:block relative"
            aria-label="Wishlist"
            onClick={handleWishlistClick}
          >
            <span className="material-symbols-outlined">favorite_border</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
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

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-surface-container-lowest border-t border-outline-variant overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[500px] py-sm' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col space-y-sm px-margin-mobile text-style-label-caps">
          <button
            className={getMobileNavClass('home') + ' text-left'}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={getMobileNavClass(cat.slug) + ' text-left'}
              onClick={() => handleNavClick(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
          
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
              className="text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer flex flex-col items-center relative"
              aria-label="Wishlist"
              onClick={handleWishlistClick}
            >
              <div className="relative">
                <span className="material-symbols-outlined mb-1">favorite_border</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </div>
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
