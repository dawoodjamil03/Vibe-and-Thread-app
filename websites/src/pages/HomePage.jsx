import Hero from '../components/Hero';
import CategoryLinks from '../components/CategoryLinks';
import FeaturedProducts from '../components/FeaturedProducts';
import TrustFooter from '../components/TrustFooter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryLinks />
      <FeaturedProducts />
      <TrustFooter />
    </>
  );
}
