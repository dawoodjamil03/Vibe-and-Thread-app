import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export default function CategoryLinks() {
  return (
    <section id="category-links" className="bg-surface-container-low py-xl">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="text-style-headline-md text-primary text-center mb-lg">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              id={`category-${cat.id}`}
              className="group flex flex-col items-center gap-md"
              to={`/collections/${cat.slug}`}
            >
              <div className="w-full aspect-[3/4] overflow-hidden bg-surface-container relative">
                <img
                  className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  alt={cat.alt}
                  src={cat.image}
                />
              </div>
              <span className="text-style-label-caps text-primary tracking-widest group-hover:text-secondary transition-colors duration-300">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
