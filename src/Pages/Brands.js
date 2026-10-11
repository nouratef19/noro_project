
import React, { useContext, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { apiValue } from '../Data/AllData';
import ProductCard from '../components/ProductCard';
import './Brands.css';

const BEAUTY = ['beauty', 'skin-care', 'fragrances'];

function Brands() {
  const { products, loading, error } = useContext(apiValue);
  const [selected, setSelected] = useState(null);

  // نجمع المنتجات حسب الماركة
  const groups = {};
  products
    .filter((p) => BEAUTY.includes(p.category) && p.brand)
    .forEach((p) => {
      if (!groups[p.brand]) {
        groups[p.brand] = { name: p.brand, image: p.thumbnail, items: [] };
      }
      groups[p.brand].items.push(p);
    });

  const brandList = Object.values(groups).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (loading) return <p className="brands-msg">Loading...</p>;
  if (error) return <p className="brands-msg">Something went wrong: {error}</p>;

  
  if (selected && groups[selected]) {
    const brand = groups[selected];
    return (
      <main className="brands-page">
        <button className="brand-back" onClick={() => setSelected(null)}>
          <FiArrowLeft /> All Brands
        </button>
        <h1>{brand.name}</h1>
        <p className="brands-sub">{brand.items.length} products</p>

        <div className="brand-products">
          {brand.items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
    );
  }

  // الشاشة الرئيسية: كل الماركات
  return (
    <main className="brands-page">
      <h1>Our Brands</h1>
      <p className="brands-sub">Shop your favorite beauty brands</p>

      <div className="brands-grid">
        {brandList.map((b) => (
          <button
            key={b.name}
            className="brand-card"
            onClick={() => setSelected(b.name)}
          >
            <div className="brand-img">
              <img src={b.image} alt={b.name} />
            </div>
            <h3>{b.name}</h3>
            <span>{b.items.length} products</span>
          </button>
        ))}
      </div>
    </main>
  );
}

export default Brands;