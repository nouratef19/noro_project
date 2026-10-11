
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { apiValue } from '../Data/AllData';
import ProductCard from './ProductCard';
import { toEGP, formatEGP } from '../Utils/price';
import './Offers.css';

const BEAUTY = ['beauty', 'skin-care', 'fragrances'];

function Offers() {
  const { products } = useContext(apiValue);

  const offers = products
    .filter((p) => BEAUTY.includes(p.category) && p.discountPercentage >= 5)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 4);

  if (offers.length === 0) return null;

  return (
    <section className="offers">
      <div className="offers-head">
        <h2>Special Offers</h2>
        <Link to="/products" className="view-all">
          View All <FiArrowRight />
        </Link>
      </div>

      <div className="offers-grid">
        {offers.map((p) => {
          const oldPrice = p.price / (1 - p.discountPercentage / 100);
          return (
            <div className="offer-item" key={p.id}>
              <span className="offer-badge">
                -{Math.round(p.discountPercentage)}%
              </span>
              <ProductCard product={p} />
              <p className="offer-old">
                Was <s>{formatEGP(toEGP(oldPrice))}</s>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Offers;