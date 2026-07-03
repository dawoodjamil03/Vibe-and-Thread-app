import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="hero-section" className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        {/* Hero Text (Left) */}
        <div className="md:col-span-6 flex flex-col gap-md min-w-0">
          <h1 className="text-style-headline-xl-mobile md:text-style-headline-xl text-primary leading-tight">
            Redefining<br />Modern Style
          </h1>
          <p className="text-style-body-lg text-on-surface-variant">
            Discover our new collection crafted from breathable, lightweight fabrics. Minimalist
            essentials designed for effortless, everyday elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-md pt-sm">
            <Link
              id="shop-mens-cta"
              to="/collections/mens"
              className="bg-primary text-on-primary text-style-button py-sm px-lg hover:bg-primary-container transition-colors duration-300 border border-transparent text-center"
            >
              Shop Men&apos;s Collection
            </Link>
            <Link
              id="shop-womens-cta"
              to="/collections/womens"
              className="bg-transparent text-primary text-style-button py-sm px-lg border border-primary hover:bg-surface-container transition-colors duration-300 text-center"
            >
              Shop Women&apos;s Collection
            </Link>
          </div>
        </div>

        {/* Hero Image (Right) */}
        <div className="md:col-span-5 md:col-start-8 mt-lg md:mt-0 h-[420px] md:h-[600px] relative w-full overflow-hidden">
          <img
            className="object-cover w-full h-full"
            alt="A high-fashion editorial photograph of a model wearing minimalist, lightweight linen clothing in a modern, sunlit architectural space"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYNkUsfciV2XvNTiUTY3RgOTM_blljr6d0GkJ1zA-pfyNt6zXpiZKand8uqBqGeg8EM79mttIHT77JlxXZVrIOo6KuaPnFbN-Y1ZdDO57dL18EdtCaCEykp0iw0EKyY7dhjMXFnGgHNhBT2Xjhl9exsbUH5gOiR4lU5_iScznnXqjdIwcxytOVu0y6-z0ABjIbURnD2594F3cBVYkxTc2qUaVOe7W6VJpvSQ-yIqxg5IXnWwyvp3n43j5vOMGMug_O8chRZMPpaUE5"
          />
        </div>
      </div>
    </section>
  );
}
