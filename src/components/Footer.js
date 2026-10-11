
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setDone(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col brand-col">
          <h3 className="footer-logo">Noro</h3>
          <p>
            Beauty made for every shade of you. Soft textures, bold colors
            and everyday essentials.
          </p>
          <div className="footer-social">
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://wa.me" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/products">All Products</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/cart">My Cart</Link>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <span>Free shipping over 2,500 EGP</span>
          <span>Easy returns within 14 days</span>
          <span>100% secure payment</span>
          <span>hello@noro.com</span>
        </div>

        <div className="footer-col">
          <h4>Stay in touch</h4>
          <p>Get beauty tips and special offers in your inbox.</p>
          {done ? (
            <p className="thanks">Thank you for subscribing!</p>
          ) : (
            <form className="news-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Join</button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 NORO. All rights reserved.</span>
        <span>Made with love</span>
      </div>
    </footer>
  );
}

export default Footer;