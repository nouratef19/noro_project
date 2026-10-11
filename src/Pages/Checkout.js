
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { FiCheckCircle, FiShoppingCart } from 'react-icons/fi';
import { formatEGP } from '../Utils/price';
import './Checkout.css';

function Checkout() {
  const { items, isEmpty, cartTotal, emptyCart } = useCart();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  const shipping = cartTotal >= 2500 ? 0 : 100;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.name.trim() === '' || form.city.trim() === '' || form.address.trim() === '') {
      setError('Please fill in all the fields.');
      return;
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    setError('');
    setOrder({
      number: 'NR' + Math.floor(100000 + Math.random() * 900000),
      total,
    });
    emptyCart();
  };



  if (order) {
    return (
      <main className="checkout-page success">
        <FiCheckCircle className="success-icon" />
        <h1>Order Confirmed!</h1>
        <p>Thank you, {form.name}. Your order is on its way.</p>
        <p className="order-info">
          Order number: <b>{order.number}</b>
          <br />
          Total to pay on delivery: <b>{formatEGP(order.total)}</b>
        </p>
        <Link to="/products" className="co-btn">
          Continue Shopping
        </Link>
      </main>
    );
  }

  // السلة فاضية
  if (isEmpty) {
    return (
      <main className="checkout-page success">
        <FiShoppingCart className="success-icon" />
        <h1>Your cart is empty</h1>
        <p>Add some products before checking out.</p>
        <Link to="/products" className="co-btn">
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Details</h2>

          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          <textarea
            name="address"
            placeholder="Full address"
            rows="3"
            value={form.address}
            onChange={handleChange}
          />

          <div className="pay-method">
            <input type="radio" checked readOnly />
            <span>Cash on delivery</span>
          </div>

          {error && <p className="co-error">{error}</p>}

          <button type="submit" className="co-btn full">
            Place Order
          </button>
        </form>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          {items.map((item) => (
            <div className="sum-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div className="sum-info">
                <span>{item.title}</span>
                <small>Qty: {item.quantity}</small>
              </div>
              <b>{formatEGP(item.itemTotal)}</b>
            </div>
          ))}

          <div className="sum-line">
          <span>Subtotal</span>
            <span>{formatEGP(cartTotal)}</span>
          </div>
          <div className="sum-line">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatEGP(shipping)}</span>
          </div>
          <div className="sum-line total">
            <span>Total</span>
            <span>{formatEGP(total)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;