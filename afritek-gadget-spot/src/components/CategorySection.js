import React from 'react';
import { Smartphone, Tablet, Headphones, Watch } from 'lucide-react';

const categories = [
  { name: 'Smartphones', count: '120+ devices', icon: Smartphone },
  { name: 'Tablets', count: '45+ devices', icon: Tablet },
  { name: 'Accessories', count: '200+ items', icon: Headphones },
  { name: 'Smartwatches', count: '60+ models', icon: Watch },
];

const CategorySection = () => {
  return (
    <section className="bg-[#0a0f18] px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="group bg-[#111827]/50 border border-gray-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:border-blue-500/50 transition-all cursor-pointer"
          >
            {/* Icon Container with Blue Tint */}
            <div className="bg-blue-500/10 p-4 rounded-xl mb-5 group-hover:bg-blue-500/20 transition-colors">
              <cat.icon size={28} className="text-[#3b82f6]" strokeWidth={2} />
            </div>

            {/* Category Name */}
            <h3 className="text-white text-lg font-bold mb-1">
              {cat.name}
            </h3>

            {/* Item Count Subtext */}
            <p className="text-gray-500 text-sm font-medium">
              {cat.count}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;