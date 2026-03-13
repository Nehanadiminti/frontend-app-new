import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Content.css";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/store`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);

    if (!found) {
      const newProduct = { ...product, quantity: 1 };
      setCart([...cart, newProduct]);
    }
  };

  return (
    <div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Baking Happiness, One Bite at a Time</h1>
          <p>
            Welcome to Bakingo Café — where every cake tells a story and
            every pastry is baked with love. Discover handcrafted desserts
            that make your moments sweeter.
          </p>

          <a href="#products">
            <button className="explore-btn">Explore Menu</button>
          </a>
        </div>
      </section>

      {/* MENU SECTION */}
      <section className="menu-section" id="products">

        <h2 className="menu-title">Our Menu</h2>

        <div className="menu-grid">
          {products.map((product) => {

            const added = cart.find(
              (item) => item._id === product._id
            );

            return (
              <div className="menu-card" key={product._id}>

                <img
                  src={`${API_URL}/${product.imageUrl}`}
                  alt={product.name}
                />

                <h3>{product.name}</h3>

                <p>{product.desc}</p>

                <div className="card-footer">

                  <span className="price">
                    ₹{product.price}
                  </span>

                  <button
                    className={added ? "added-btn" : "cart-btn"}
                    onClick={() => addToCart(product)}
                  >
                    {added ? "Added ✓" : "Add to Cart"}
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* ABOUT SECTION */}

<section className="about-section">

  <h2>Why Choose Bakingo?</h2>

  <div className="about-grid">

    <div className="about-card">
      <h3>Fresh Ingredients</h3>
      <p>
        Every dessert is prepared with fresh and premium ingredients
        to ensure the best taste and quality.
      </p>
    </div>

    <div className="about-card">
      <h3>Handcrafted Desserts</h3>
      <p>
        Our cakes and pastries are handcrafted with passion,
        bringing you authentic bakery flavors.
      </p>
    </div>

    <div className="about-card">
      <h3>Perfect for Celebrations</h3>
      <p>
        From birthdays to special moments, our desserts make
        every celebration sweeter.
      </p>
    </div>

  </div>

</section>

    </div>
  );
}

export default Content;