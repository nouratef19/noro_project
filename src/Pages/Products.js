

import React, { useContext, useEffect  ,useState } from 'react';
import {useSearchParams} from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { apiValue } from '../Data/AllData';
import ProductCard from '../components/ProductCard';
import './Products.css';

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Makeup', value: 'beauty' },
  { label: 'Skincare', value: 'skin-care' },
  { label: 'Fragrances', value: 'fragrances' },
];

const BEAUTY = ['beauty', 'skin-care', 'fragrances'];

function Products() {
  const { products, loading, error } = useContext(apiValue);
  const [category, setCategory] = useState('all');
  const [params] = useSearchParams();
const [search, setSearch] = useState(params.get('search') || '');

useEffect(() => {
  setSearch(params.get('search') || '');
}, [params]);
  const [sort, setSort] = useState('popular');

  let list = products.filter((p) => BEAUTY.includes(p.category));

  if (category !== 'all') {
    list = list.filter((p) => p.category === category);
  }

  if (search.trim() !== '') {
    list = list.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  list = [...list].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'name') return a.title.localeCompare(b.title);
    return b.rating - a.rating;
  });

  return (
    <main className="products-page">
      <h1>All Products</h1>

      <div className="toolbar">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popular">Sort by: Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <div className="products-layout">
        <aside className="categories">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              className={category === c.value ? 'cat active' : 'cat'}
              onClick={() => setCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </aside>

        <section className="products-area">
          {loading && <p>Loading...</p>}
          {error && <p>Something went wrong: {error}</p>}
          {!loading && !error && list.length === 0 && (
            <p>No products found.</p>
          )}

          <div className="products-grid">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Products;