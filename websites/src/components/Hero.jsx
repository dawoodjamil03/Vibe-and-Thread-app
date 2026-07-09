import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
};

const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} id="hero-section" className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        {/* Hero Text (Left) */}
        <motion.div 
          className="md:col-span-6 flex flex-col gap-md min-w-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-style-headline-xl-mobile md:text-style-headline-xl text-primary leading-tight"
          >
            Refined<br />Ethnic Elegance
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-style-body-lg text-on-surface-variant max-w-[480px]"
          >
            Discover our premium range of unstitched fabrics, signature fragrances, and curated accessories designed to elevate your everyday style.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-md pt-sm"
          >
            <a
              id="shop-unstitched-cta"
              href="#category-unstitched"
              className="bg-primary text-on-primary text-style-button py-sm px-lg hover:bg-primary-container transition-colors duration-300 border border-transparent text-center"
            >
              Shop New Arrivals
            </a>
            <a
              id="shop-kurta-cta"
              href="#category-kurta-pajama"
              className="bg-transparent text-primary text-style-button py-sm px-lg border border-primary hover:bg-surface-container transition-colors duration-300 text-center"
            >
              Explore Collections
            </a>
          </motion.div>
        </motion.div>

        {/* Hero Image (Right) */}
        <div className="md:col-span-5 md:col-start-8 mt-lg md:mt-0 h-[420px] md:h-[600px] relative w-full overflow-hidden rounded-sm">
          <motion.img
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="object-cover w-full h-[120%]"
            style={{ y, originY: 0 }}
            alt="Premium unstitched fabrics and ethnic menswear"
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1200"
          />
        </div>
      </div>
    </section>
  );
}
