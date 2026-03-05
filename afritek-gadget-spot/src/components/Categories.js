import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Tablet, Headphones, Watch } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoriesData = [
    {
      id: 1,
      name: "Smartphones",
      icon: Smartphone,
      count: 120,
      color: "from-cyan-600 to-cyan-400",
      bgGradient: "from-cyan-500/20 to-cyan-500/0",
      path: "Phones",
    },
    {
      id: 2,
      name: "Tablets",
      icon: Tablet,
      count: 45,
      color: "from-teal-600 to-teal-400",
      bgGradient: "from-teal-500/20 to-teal-500/0",
      path: "Tablets",
    },
    {
      id: 3,
      name: "Accessories",
      icon: Headphones,
      count: 200,
      color: "from-cyan-600 to-cyan-400",
      bgGradient: "from-cyan-500/20 to-cyan-500/0",
      path: "Accessories",
    },
    {
      id: 4,
      name: "Smartwatches",
      icon: Watch,
      count: 60,
      color: "from-teal-600 to-teal-400",
      bgGradient: "from-teal-500/20 to-teal-500/0",
      path: "Smartwatches",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setCategories(categoriesData);
      setLoading(false);
    }, 500);
  }, []);

  const handleCategoryClick = (categoryPath) => {
    navigate("/shop", { state: { selectedCategory: categoryPath } });
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Shop by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            Category
          </span>
        </h2>
        <p className="text-gray-400">
          Browse our extensive collection of premium devices
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const IconComponent = category.icon;

          return (
            <div
              key={category.id}
              className={`transform transition-all duration-500 ${
                loading
                  ? "opacity-0 translate-y-8"
                  : "opacity-100 translate-y-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => handleCategoryClick(category.path)}
                className="w-full group relative overflow-hidden rounded-2xl p-8 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 bg-[#111827] hover:bg-[#1a1f2e]"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                {/* Animated Glow */}
                <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-cyan-600/20 group-hover:to-teal-400/20 transition-all duration-300 border border-gray-700 group-hover:border-cyan-500/50">
                    <IconComponent
                      size={32}
                      className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 group-hover:scale-110 transform"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {category.name}
                  </h3>

                  {/* Count */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {category.count}+ items
                    </span>
                    <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>

                {/* Bottom Border */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-600 to-teal-400 w-0 group-hover:w-full transition-all duration-500"></div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-12 p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl">
        <p className="text-cyan-400 text-center">
          💡 Click on any category to explore our collection and use filters to
          find exactly what you're looking for
        </p>
      </div>
    </section>
  );
};

export default Categories;
