import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchFilter from "../components/SearchFilter";
import ProductCard from "../components/ProductCard";
import RequestState from "../components/RequestState";
import useResource from "../hooks/useResource";

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const search = (params.get('q') || '').slice(0, 100);
  const brand = (params.get('brand') || '').slice(0, 100);
  const min = params.get('min') || '';
  const max = params.get('max') || '';
  const available = params.get('available') === 'true';
  const page = Math.max(1, Math.min(100000, Number(params.get('page')) || 1));
  const result = useResource(`/products?search=${encodeURIComponent(search)}&availability=${available ? 'available' : 'all'}&page=${Math.floor(page)}&pageSize=12&brand=${encodeURIComponent(brand)}${min !== '' ? `&minPriceMinor=${Math.round(Number(min) * 100)}` : ''}${max !== '' ? `&maxPriceMinor=${Math.round(Number(max) * 100)}` : ''}`);
  const filteredProducts = result.data?.items || [];
  function filter(value) {
    setParams({ ...(value.search ? { q: value.search } : {}), ...(value.available ? { available: 'true' } : {}), ...(value.brand ? { brand: value.brand } : {}), ...(value.min ? { min: value.min } : {}), ...(value.max ? { max: value.max } : {}) }, { replace: true });
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] via-[#0a0c10] to-[#000000] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Latest <span className="text-cyan-400">Phones</span>
          </h1>
          <p className="text-gray-400">
            {result.data ? `${result.data.total} phones` : 'Browse our phone catalogue'}
          </p>
        </div>

        {/* Main Layout: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <SearchFilter value={{ search, available, brand, min, max }} onChange={filter} />
          </div>

          {/* RIGHT SIDE: PRODUCTS GRID */}
          <div className="flex-1 min-w-0">
            <RequestState {...result} />
            {!result.loading && !result.error && (filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-[#111827] rounded-2xl border border-gray-800">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-400 text-xl mb-6">No products found</p>
                <p className="text-gray-500 text-sm mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => filter({ search: '', available: false })}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-lg transition-all flex items-center gap-2"
                >
                  Clear All Filters
                </button>
              </div>
            ))}
            {result.data?.pages > 1 && <nav aria-label="Product pages" className="flex items-center justify-between gap-3 mt-8">
              <button disabled={page <= 1 || result.loading} onClick={() => setParams({ ...Object.fromEntries(params), page: String(page - 1) })} className="bg-teal-700 p-3 rounded-lg disabled:opacity-50">Previous</button>
              <span>Page {page} of {result.data.pages}</span>
              <button disabled={page >= result.data.pages || result.loading} onClick={() => setParams({ ...Object.fromEntries(params), page: String(page + 1) })} className="bg-teal-700 p-3 rounded-lg disabled:opacity-50">Next</button>
            </nav>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
