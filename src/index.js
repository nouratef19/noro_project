

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import './index.css';

import App from './App';
import { AllData } from './Data/AllData';
import { FavoritesProvider } from './Data/FavoritesContext';
import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import Favorites from './Pages/Favorites';
import Login from './Pages/Login';
import Brands from './Pages/Brands';
import AllCart from './Cart/AllCart';
import Checkout from './Pages/Checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'brands', element: <Brands /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'cart', element: <AllCart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'login', element: <Login /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AllData>
    <FavoritesProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </FavoritesProvider>
  </AllData>
);