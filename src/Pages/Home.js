import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { apiValue } from '../Data/AllData';
import ProductCard from '../components/ProductCard';
import Offers from '../components/Offers';
import hero from '../assets/images/photo_2026-10-08_14-52-01.jpg';
import './Home.css';

const BEAUTY = ['beauty', 'skin-care', 'fragrances'];
const PER_PAGE = 4;

function Home() {
  const { products, loading, error } = useContext(apiValue);
  const [page, setPage] = useState(0);

  const bestSellers = products
    .filter((p) => BEAUTY.includes(p.category))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 16);

  const pages = Math.ceil(bestSellers.length / PER_PAGE);
  const visible = bestSellers.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-text">
          <span className="hero-tag">Made for her</span>
          <h1>
            Your beauty, <em>your way</em>
          </h1>
          <p>
            Shades that shine, textures you'll love, and everything you
            need to feel your best.
          </p>
          <div className="hero-btns">
            <Link to="/products" className="hero-btn">
              Shop Now <FiArrowRight />
            </Link>
            <Link to="/brands" className="hero-btn outline">
              Explore Brands
            </Link>
          </div>
        </div>

        <div className="hero-img-wrap">
          <img src={hero} alt="NORO beauty" className="hero-img" />
        </div>
      </section>

      <section className="best">
        <div className="best-head">
          <h2>Best Sellers</h2>
          <Link to="/products" className="view-all">
            View All <FiArrowRight />
          </Link>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Something went wrong: {error}</p>}

        <div className="best-grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              className={i === page ? 'dot active' : 'dot'}
              onClick={() => setPage(i)}
              aria-label={'Page ' + (i + 1)}
            />
          ))}
        </div>
      </section>

      <Offers />
    </main>
  );
}

export default Home;