import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <h3>☕ Bakingo</h3>

        <p>
          Freshly brewed coffee and delicious treats made with love.
        </p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/cart">Cart</a>
          <a href="/orders">Orders</a>
        </div>

        <p className="copyright">
          © 2026 Bakingo Café. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;