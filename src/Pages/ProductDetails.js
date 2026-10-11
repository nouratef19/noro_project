  import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import {
  FiArrowLeft, FiStar, FiMinus, FiPlus, FiShoppingCart,
  FiHeart, FiTruck, FiRefreshCw, FiLock,
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { apiValue } from '../Data/AllData';
import { useFavorites } from '../Data/FavoritesContext';
import { toEGP, formatEGP } from '../Utils/price';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const { products, loading } = useContext(apiValue);
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (loading) return <p className="details-msg">Loading...</p>;
  if (!product) return <p className="details-msg">Product not found.</p>;

  const images =
    product.images && product.images.length ? product.images : [product.thumbnail];
  const reviewsCount = product.reviews ? product.reviews.length : 0;
  const fav = isFavorite(product.id);

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        title: product.title,
        price: toEGP(product.price),
        thumbnail: product.thumbnail,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="details">
      <div className="details-grid">
        <div className="thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={i === activeImg ? 'thumb active' : 'thumb'}
              onClick={() => setActiveImg(i)}
            >
              <img src={img} alt="" />
            </button>
          ))}
        </div>

        <div className="main-img">
          <img src={images[activeImg]} alt={product.title} />
        </div>

        <div className="info">
          <Link to="/products" className="back">
            <FiArrowLeft /> Back to Products
          </Link>
          <h1>{product.title}</h1>

          <div className="rating">
            <FiStar className="star" />
            <b>{product.rating}</b>
            <span>({reviewsCount} reviews)</span>
          </div>

          <p className="price">{formatEGP(toEGP(product.price))}</p>
          <p className="desc">{product.description}</p>

          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>
              <FiMinus />
            </button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>
              <FiPlus />
            </button>
          </div>

          <button className="add-btn" onClick={handleAdd}>
            <FiShoppingCart /> {added ? 'Added!' : 'Add to Cart'}
          </button>

          <button className="fav-btn" onClick={() => toggleFavorite(product.id)}>
            {fav ? <FaHeart /> : <FiHeart />}
            {fav ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>

      <div className="perks">
        <div className="perk">
          <FiTruck />
          <div>
            <b>Free Shipping</b>
            <span>on orders over 2,500 EGP</span>
          </div>
        </div>
        <div className="perk">
          <FiRefreshCw />
          <div>
            <b>Easy Returns</b>
            <span>within 14 days</span>
          </div>
        </div>
        <div className="perk">
          <FiLock />
          <div>
            <b>Secure Payment</b>
            <span>100% secure</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;