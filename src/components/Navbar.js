import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { apiValue } from '../Data/AllData';
import { toEGP, formatEGP } from '../Utils/price';
import logo from '../assets/images/photo_2026-10-10_20-58-46.jpg';
import './Navbar.css';

function Navbar() {
  const { totalItems } = useCart();
  const { products } = useContext(apiValue);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results =
    query.trim() === ''
      ? []
      : products
          .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5);

  const closeSearch = () => {
    setOpen(false);
    setQuery('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    navigate('/products?search=' + encodeURIComponent(query.trim()));
    closeSearch();
  };

  const goToProduct = (id) => {
    navigate('/products/' + id);
    closeSearch();
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="NORO" className="logo-img" />
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/brands">Brands</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>

      <div className="nav-actions">
        <button
          className="icon-btn search-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Search"
        >
          {open ? <FiX /> : <FiSearch />}
        </button>

        <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
          <FiShoppingCart />
          {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </Link>

        <Link to="/login" className="signin">
          <FiUser />
          <span>Sign In</span>
        </Link>
      </div>

      {open && (
        <div className="search-panel">
          <form onSubmit={handleSubmit} className="search-form">
            <FiSearch />
            <input
              autoFocus
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          {query.trim() !== '' && (
            <div className="search-results">
              {results.length === 0 && (
                <p className="search-empty">No products found.</p>
              )}
              {results.map((p) => (
                <button
                  key={p.id}
                  className="search-item"
                  onClick={() => goToProduct(p.id)}
                >
                  <img src={p.thumbnail} alt="" />
                  <span className="search-name">{p.title}</span>
                  <span className="search-price">
                    {formatEGP(toEGP(p.price))}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;