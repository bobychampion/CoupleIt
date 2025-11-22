import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group relative flex flex-col gap-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="aspect-[5/4] w-full overflow-hidden rounded-2xl bg-stone-100 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay / Action Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-stone-900">
              <ArrowUpRight className="h-5 w-5" />
           </div>
        </div>

        <div className="absolute bottom-3 left-3">
           <span className="inline-flex items-center rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-stone-900 shadow-sm backdrop-blur-sm">
             {product.category}
           </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-stone-900 font-serif group-hover:text-primary-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-medium text-stone-900">
            ₦{product.basePrice.toLocaleString()}
          </p>
        </div>
        <p className="text-sm text-stone-500 line-clamp-1 mt-1">{product.description}</p>
        
        {/* Color Swatches (Preview) */}
        <div className="mt-3 flex items-center gap-1.5">
           {product.availableColors.slice(0, 3).map((color, i) => (
             <div 
               key={i}
               className="h-3 w-3 rounded-full border border-stone-200"
               style={{ backgroundColor: color.includes('Natural') ? '#e3d2a5' : color.includes('Walnut') ? '#5e412a' : color.includes('Black') ? '#1c1917' : color.includes('White') ? '#f5f5f4' : '#78716c' }}
             />
           ))}
           {product.availableColors.length > 3 && (
             <span className="text-[10px] text-stone-400">+more</span>
           )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;