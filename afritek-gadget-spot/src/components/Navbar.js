import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, ArrowUpRight } from 'lucide-react';
import AfritekLogo from '../Images/AfritekLogoLogo.jpeg';

export default function Navbar({ cartItems = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const menuButton = React.useRef(null);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  React.useEffect(() => { setOpen(false); setSearch(new URLSearchParams(location.search).get('q') || ''); }, [location.pathname, location.search]);
  function closeOnEscape(event) {
    if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); }
  }
  const links = <><NavLink to="/shop">Shop phones</NavLink><NavLink to="/about">Our story</NavLink><NavLink to="/contact">Visit our shop <ArrowUpRight size={14} aria-hidden="true" /></NavLink></>;
  return <nav className="store-nav" aria-label="Main navigation" onKeyDown={closeOnEscape}>
    <div className="store-container nav-layout">
      <Link to="/" className="store-brand" aria-label="Afritek Gadget Spot home"><img src={AfritekLogo} alt="" width="44" height="44" /><span>Afritek<span className="brand-caption">GADGET SPOT</span></span></Link>
      <form className="nav-search" role="search" onSubmit={event => { event.preventDefault(); navigate(search.trim() ? `/shop?q=${encodeURIComponent(search.trim())}` : '/shop'); setOpen(false); }}>
        <Search size={18} aria-hidden="true" /><input aria-label="Search catalogue" type="search" maxLength={100} placeholder="Search phones or brands" value={search} onChange={event => setSearch(event.target.value)} /><button type="submit" aria-label="Search catalogue">Search</button>
      </form>
      <div className="nav-desktop">{links}</div>
      <div className="nav-actions"><Link to="/cart" className="nav-cart" aria-label={`Cart, ${count} items`}><ShoppingBag size={21} aria-hidden="true" /><span className="cart-label">Cart</span><span className="cart-count">{count}</span></Link><button ref={menuButton} className="nav-menu" aria-label="Menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button></div>
    </div>
    {open && <div id="mobile-navigation" className="mobile-navigation">{links}</div>}
  </nav>;
}
