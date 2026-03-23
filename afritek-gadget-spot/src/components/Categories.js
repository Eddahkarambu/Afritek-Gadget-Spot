import React, { useState, useMemo } from 'react';
import { Smartphone, Watch, Headphones, Zap } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const categoriesData = useMemo(() => [
    {
      id: 1,
      name: 'Smartphones',
      icon: Smartphone,
      color: 'from-teal-600 to-cyan-600',
      count: 156,
      description: 'Latest phone models'
    },
    {
      id: 2,
      name: 'Tablets',
      icon: Zap,
      color: 'from-purple-600 to-indigo-600',
      count: 89,
      description: 'Premium tablets'
    },
    {
      id: 3,
      name: 'Wearables',
      icon: Watch,
      color: 'from-cyan-600 to-teal-600',
      count: 64,
      description: 'Smart watches & bands'
    },
    {
      id: 4,
      name: 'Audio',
      icon: Headphones,
      color: 'from-indigo-600 to-purple-600',
      count: 112,
      description: 'Headphones & speakers'
    }
  ], []);

  React.useEffect(() => {
    setCategories(categoriesData);
  }, [categoriesData]);

  return (
    <section className="bg-gradient-to-b from-white to-teal-50 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Category</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Browse our extensive collection organized by product type
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group bg-white rounded-xl border-2 border-teal-200 hover:border-purple-500 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer"
              >
                {/* Header */}
                <div className={`bg-gradient-to-br ${category.color} p-8 text-white flex items-center justify-center h-40 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={64} />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-teal-600">
                      {category.count} Products
                    </span>
                    <button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm">
                      View →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-teal-900 to-teal-800 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Browse All Products</h3>
          <p className="text-cyan-100 mb-8 text-lg">
            Explore our complete collection of gadgets and electronics
          </p>
          <button className="bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-500 hover:to-teal-500 text-teal-900 px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;