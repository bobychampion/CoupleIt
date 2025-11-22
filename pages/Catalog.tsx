import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const Catalog: React.FC = () => {
  const { getProductsByCategory } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('All');
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Get products by category then filter by search query
  const productsByCategory = getProductsByCategory(activeCategory === 'All' ? undefined : activeCategory);
  
  const displayedProducts = productsByCategory.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['All', ...Object.values(Category)];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Furniture Catalog
            </h1>
            <p className="mt-4 text-lg text-stone-600">
              Explore our collection of customizable templates. Designed by us, built by you.
            </p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            
            {/* Categories */}
            <div className="flex-1 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-stone-900 text-white shadow-md'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search & Tools */}
            <div className="flex items-center gap-3 w-full md:w-auto">
               <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input 
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-stone-200 bg-stone-50 py-2 pl-10 pr-8 text-sm focus:border-stone-900 focus:outline-none focus:ring-0 transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
               </div>
               <button className="hidden sm:flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden lg:inline">Filter</span>
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-stone-500">
               Showing <span className="font-bold text-stone-900">{displayedProducts.length}</span> results
            </p>
        </div>

        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-stone-50 p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-medium text-stone-900">No templates found</h3>
            <p className="mt-2 text-stone-500 max-w-sm">
              We couldn't find any templates matching "{searchQuery}" in {activeCategory}. Try adjusting your search or category.
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-6 text-primary-700 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;