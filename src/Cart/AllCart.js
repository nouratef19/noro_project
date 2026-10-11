

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import {
  FiShoppingCart, FiMinus, FiPlus, FiTrash2, FiArrowRight,
} from 'react-icons/fi';
import { formatEGP } from '../Utils/price';
import './AllCart.css';

function AllCart() {
  const { items, isEmpty, cartTotal, updateItemQuantity, removeItem } = useCart();
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [msg, setMsg] = useState('');

  const applyPromo = () => {
    if (code.trim().toUpperCase() === 'NORO10') {
      setDiscount(0.1);
      setMsg('10% discount applied');
    } else {
      setDiscount(0);
      setMsg('Invalid promo code');
    }
  };

  if (isEmpty) {
    return (
      <main className="cart-page empty">
        <div className="empty-icon">
          <FiShoppingCart />
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="start-btn">
          Start Shopping <FiArrowRight />
        </Link>
      </main>
    );
  }

  const discountAmount = Math.round(cartTotal * discount);
  const shipping = cartTotal >= 2500 ? 0 : 100;
  const total = cartTotal - discountAmount + shipping;

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-table">
        <div className="cart-row cart-head">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span></span>
        </div>

        {items.map((item) => (
          <div className="cart-row" key={item.id}>
            <div className="cart-product">
              <img src={item.thumbnail} alt={item.title} />
              <span>{item.title}</span>
            </div>
            <span>{formatEGP(item.price)}</span>
            <div className="cart-qty">
              <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                <FiMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                <FiPlus />
              </button>
            </div>
            <span>{formatEGP(item.itemTotal)}</span>
            <button className="trash" onClick={() => removeItem(item.id)}>
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-bottom">
        <div className="promo">
          <div className="promo-row">
            <input
              type="text"
              placeholder="Enter promo code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={applyPromo}>Apply</button>
          </div>
          {msg && <small>{msg}</small>}
        </div>

        <div className="summary">
          <div className="sum-row">
            <span>Subtotal</span>
            <span>{formatEGP(cartTotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="sum-row">
              <span>Discount</span>
              <span>- {formatEGP(discountAmount)}</span>
            </div>
          )}
          <div className="sum-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatEGP(shipping)}</span>
          </div>
          <div className="sum-row total">
            <span>Total</span>
            <span>{formatEGP(total)}</span>
          </div>
         <Link to="/checkout" className="checkout">
  Checkout <FiArrowRight />
</Link>
        </div>
      </div>
    </main>
  );
}

export default AllCart;