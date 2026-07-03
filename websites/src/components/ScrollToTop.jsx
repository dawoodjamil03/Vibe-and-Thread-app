import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Forces the window to scroll back to the top whenever the route changes.
 * React Router swaps components in the DOM without a real page refresh,
 * so without this hook the browser keeps its scroll position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
