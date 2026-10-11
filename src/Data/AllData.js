
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const apiValue = createContext();

function AllData({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products?limit=100')
      .then((res) => setProducts(res.data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <apiValue.Provider value={{ products, loading, error }}>
      {children}
    </apiValue.Provider>
  );
}

export { AllData, apiValue };