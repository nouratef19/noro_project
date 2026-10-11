
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { apiValue } from '../Data/AllData';
import { useFavorites } from '../Data/FavoritesContext';
import ProductCard from '../components/ProductCard';
import './Favorites.css';

function Favorites() {
  const { products, loading } = useContext(apiValue);
  const { favorites } = useFavorites();

  const list = products.filter((p) => favorites.includes(p.id));

  return (
    <main className="fav-page">
      <h1>
        <FaHeart className="fav-title-icon" /> Favorites
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && list.length === 0 && (
        <div className="fav-empty">
          <div className="fav-empty-icon">
            <FaHeart />
          </div>
          <h2>No favorites yet</h2>
          <p>Tap the heart on any product to save it here.</p>
          <Link to="/products" className="fav-btn-link">
            Browse Products <FiArrowRight />
          </Link>
        </div>
      )}

      <div className="fav-grid">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}

export default Favorites;