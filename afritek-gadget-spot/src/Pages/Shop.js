import AccessoryCategories from '../components/AccessoryCategories';
import { accessoryCategories, categoryLabels } from '../lib/categories';
import { Link } from 'react-router-dom';
import VisitShop from '../components/VisitShop';
import React, { useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import SearchFilter from "../components/SearchFilter";
import ProductCard from "../components/ProductCard";
import RequestState from "../components/RequestState";
import useResource from "../hooks/useResource";

const Shop = ({ accessories = false }) => {
  const location = useLocation();
  const resultsHeading = useRef(null);
  const pendingPage = useRef(null);
  const restoredLocation = useRef(null);
  const [params, setParams] = useSearchParams();
  const allowed = accessories ? ['ACCESSORIES', ...accessoryCategories.map(c => c.value)] : Object.keys(categoryLabels);
  const category = allowed.includes(params.get('category')) ? params.get('category') : accessories ? 'ACCESSORIES' : 'PHONE';
  const allAccessoriesParams = new URLSearchParams(params);
  allAccessoriesParams.delete('category'); allAccessoriesParams.delete('page');
  const phones = category === 'PHONE';
  const search = (params.get('q') || '').slice(0, 100);
  const brand = (params.get('brand') || '').slice(0, 100);
  const price = name => { const raw = params.get(name); return raw !== null && raw.trim() !== '' && Number.isFinite(Number(raw)) && Number(raw) >= 0 && Number(raw) <= 20000000 ? String(Math.round(Number(raw) * 100) / 100) : ''; };
  const min = price('min');
  const max = price('max');
  const available = params.get('available') === 'true';
  const page = Math.max(1, Math.min(100000, Number(params.get('page')) || 1));
  const cataloguePath = `/products?category=${category}&search=${encodeURIComponent(search)}&availability=${available ? 'available' : 'all'}&page=${Math.floor(page)}&pageSize=12&brand=${encodeURIComponent(brand)}${min !== '' ? `&minPriceMinor=${Math.round(Number(min) * 100)}` : ''}${max !== '' ? `&maxPriceMinor=${Math.round(Number(max) * 100)}` : ''}`;
  const result = useResource(cataloguePath, { keepPreviousData: true });
  const filteredProducts = result.data?.items || [];
  useEffect(() => {
    if (result.loading || result.error || !result.data || result.path !== cataloguePath) return;
    if (pendingPage.current === location.search) {
      pendingPage.current = null;
      resultsHeading.current?.focus({ preventScroll: true });
      resultsHeading.current?.scrollIntoView({ block: 'start' });
    } else if (restoredLocation.current !== location.key && location.state?.returnToProduct) {
      restoredLocation.current = location.key;
      const card = document.getElementById(`phone-${location.state.returnToProduct}`);
      card?.focus({ preventScroll: true });
      card?.scrollIntoView({ block: 'start' });
    }
  }, [result.loading, result.error, result.data, result.path, cataloguePath, location]);
  function changePage(nextPage) {
    const next = new URLSearchParams(params);
    next.set('page', String(nextPage));
    pendingPage.current = `?${next.toString()}`;
    setParams(next, { state: null });
  }

  function filter(value) {
    setParams({ ...(params.has('category') ? { category } : {}), ...(value.search ? { q: value.search } : {}), ...(value.available ? { available: 'true' } : {}), ...(value.brand ? { brand: value.brand } : {}), ...(value.min ? { min: value.min } : {}), ...(value.max ? { max: value.max } : {}) }, { replace: true });
  }
  const active = [['q', search, `Search: ${search}`], ['brand', brand, brand], ['min', min, `From KSh ${Number(min).toLocaleString('en-KE')}`], ['max', max, `Up to KSh ${Number(max).toLocaleString('en-KE')}`], ['available', available, 'Available to order']].filter(([, value]) => value !== '' && value !== false);
  return (
    <div className="shop-page min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {accessories ? category === 'ACCESSORIES' ? 'Phone accessories' : categoryLabels[category] : phones ? 'Find your next phone' : 'Phones & accessories'}
          </h1>
          <p className="text-gray-600">
            {result.data ? `${result.data.total} ${phones ? result.data.total === 1 ? 'phone' : 'phones' : result.data.total === 1 ? 'product' : 'products'}` : phones ? 'Browse our phone catalogue' : 'Browse our catalogue'}
          </p>
        </div>

        {accessories && <><p className="accessory-intro">Power, sound and everyday essentials. Find the right fit for your device.</p><AccessoryCategories selected={category} search={location.search} /><div className="accessory-browse-links"><Link to={`/accessories${allAccessoriesParams.size ? `?${allAccessoriesParams}` : ''}`} aria-current={category === 'ACCESSORIES' ? 'page' : undefined}>All accessories</Link><Link to="/shop">Shop phones →</Link></div></>}
        {!accessories && !phones && <nav className="accessory-browse-links" aria-label="Shop departments"><Link to="/shop">Phones</Link><Link to="/accessories">Accessories</Link></nav>}
        {accessories ? <aside className="accessory-visit"><p><strong>Walk in and buy.</strong> Find Afritek Gadget Spot in The Bazaar building, Wing 5, Mezzanine floor. No online order needed.</p><Link to="/contact#shop-location">Visit our shop →</Link></aside> : <VisitShop />}
        {/* Main Layout: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <SearchFilter phones={phones} key={category} value={{ search, available, brand, min, max }} onChange={filter} />
          </div>

          {/* RIGHT SIDE: PRODUCTS GRID */}
          <div className="flex-1 min-w-0">
            {active.length > 0 && <div className="active-filters" aria-label="Applied filters">{active.map(([key, , label]) => <button key={key} aria-label={`Remove ${label} filter`} onClick={() => { const next = new URLSearchParams(params); next.delete(key); next.delete('page'); setParams(next); }}>{label}<span aria-hidden="true"> ×</span></button>)}</div>}
            <h2 ref={resultsHeading} tabIndex={-1} className="catalogue-results-heading">{phones ? 'Phone results' : 'Product results'}</h2>
            <p className="catalogue-note">{phones ? 'Choose a phone to see its storage, colour and price options.' : 'Choose a product to check its options, specifications and price.'}</p>
            <div className="min-h-8" role="status">{result.loading && result.data ? phones ? 'Updating phones…' : 'Updating products…' : ''}</div>
            {(!result.data || result.error) && <RequestState {...result} />}
            {result.data && !result.error && (filteredProducts.length > 0 ? (
              <div className="phone-grid shop-phone-grid" aria-busy={result.loading}>
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200">

                <p className="text-gray-600 text-xl mb-6">No products found</p>
                <p className="text-gray-500 text-sm mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => filter({ search: '', available: false })}
                  className="solid-button"
                >
                  Clear All Filters
                </button>
              </div>
            ))}
            {result.data?.pages > 1 && <nav aria-label="Product pages" className="flex items-center justify-between gap-3 mt-8">
              <button disabled={page <= 1 || result.loading} onClick={() => changePage(page - 1)} className="bg-teal-800 text-white p-3 rounded-lg disabled:opacity-50">Previous</button>
              <span>Page {result.data.page || Math.floor(page)} of {result.data.pages}</span>
              <button disabled={page >= result.data.pages || result.loading} onClick={() => changePage(page + 1)} className="bg-teal-800 text-white p-3 rounded-lg disabled:opacity-50">Next</button>
            </nav>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
