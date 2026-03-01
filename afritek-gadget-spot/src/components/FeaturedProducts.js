import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'SAMSUNG',
    price: 'KSh 189,999',
    oldPrice: 'KSh 210,000',
    tag: 'Hot Deal',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'iPhone 16 Pro Max',
    brand: 'APPLE',
    price: 'KSh 225,000',
    tag: 'New',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800'
  }
];

const FeaturedProducts = () => {
  return (
    <section className="bg-[#0a0f18] px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-[#3b82f6]">Products</span>
          </h2>
          <p className="text-gray-400">
            Top picks from the latest smartphones, tablets & accessories
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:px-20">
          {products.map((product) => (
            <div key={product.id} className="bg-[#111827] rounded-[2.5rem] overflow-hidden border border-gray-800 flex flex-col">
              
              {/* Image Area with Badge */}
              <div className="relative p-8 bg-[#161b22] m-3 rounded-[2rem] h-80 flex items-center justify-center">
                <span className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  product.tag === 'Hot Deal' ? 'bg-[#3b82f6] text-white' : 'bg-[#3b82f6]/20 text-[#3b82f6]'
                }`}>
                  {product.tag}
                </span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details Area */}
              <div className="p-8 pt-4">
                <p className="text-[#3b82f6] text-[11px] font-bold tracking-[0.2em] mb-2">
                  {product.brand}
                </p>
                <h3 className="text-white text-2xl font-bold mb-3">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#eab308] text-[#eab308]" />
                  ))}
                  <span className="text-gray-500 text-sm ml-2">({product.rating.toFixed(1)})</span>
                </div>

                {/* Price and Cart */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-white text-2xl font-bold">{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-gray-500 line-through text-sm">{product.oldPrice}</span>
                    )}
                  </div>
                  <button className="bg-[#3b82f6] p-4 rounded-2xl text-white hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/10">
                    <ShoppingCart size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;