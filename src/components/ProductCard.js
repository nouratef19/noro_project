
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { toEGP, formatEGP } from '../Utils/price';
import { useFavorites } from '../Data/FavoritesContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(product.id);

  const handleAdd = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: toEGP(product.price),
      thumbnail: product.thumbnail,
    });
  };

  return (
    <div className="card">
      <div className="card-img">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <h3 className="card-title">{product.title}</h3>
      <p className="card-price">{formatEGP(toEGP(product.price))}</p>
      <p className="card-rating">
        <FiStar /> {product.rating}
      </p>

      <div className="card-actions">
        <Link to={'/products/' + product.id} className="details-btn">
          Details
        </Link>
        <button className="icon-action" onClick={handleAdd} aria-label="Add to cart">
          <FiShoppingCart />
        </button>
        <button
          className="icon-action"
          onClick={() => toggleFavorite(product.id)}
          aria-label="Toggle favorite"
        >
          {fav ? <FaHeart /> : <FiHeart />}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;