import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { ArrowRight } from 'lucide-react';

const categoryData = [
  {
    id: Category.LIVING_ROOM,
    title: 'Living Room',
    description: 'Centerpieces for your gathering spaces. Coffee tables, TV consoles, and more.',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80',
    itemCount: '12 templates'
  },
  {
    id: Category.OFFICE,
    title: 'Office & Workspace',
    description: 'Productivity havens for modern work. Desks and organizers.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    itemCount: '8 templates'
  },
  {
    id: Category.BEDROOM,
    title: 'Bedroom',
    description: 'Serene sanctuaries for rest. Nightstands and bed frames.',
    image: 'https://images.unsplash.com/photo-1505693416388-b0346efee749?auto=format&fit=crop&w=800&q=80',
    itemCount: '6 templates'
  },
  {
    id: Category.STORAGE,
    title: 'Storage & Shelving',
    description: 'Organize your life with style. Bookshelves and cabinets.',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80',
    itemCount: '9 templates'
  },
  {
    id: Category.DECOR,
    title: 'Decor & Accessories',
    description: 'The finishing touches that make a home unique.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    itemCount: '15 templates'
  }
];

const Categories: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-stone-900 tracking-tight sm:text-5xl">
            Browse Categories
          </h1>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Explore our curated collections of pre-designed templates. Find the perfect starting point for your next DIY project.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categoryData.map((category) => (
            <Link 
              key={category.id} 
              to={`/catalog?category=${encodeURIComponent(category.id)}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-stone-100 shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-50 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-1">{category.itemCount}</p>
                    <h3 className="text-2xl font-bold font-serif tracking-tight">{category.title}</h3>
                  </div>
                  <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-transform group-hover:translate-x-1 group-hover:bg-white/30">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
                   <div className="overflow-hidden">
                      <p className="mt-3 text-sm text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        {category.description}
                      </p>
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;