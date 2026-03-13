import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  const increment = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      })
    );
  };

  const decrement = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    if (user?.email) {
      const url = `${API_URL}/orders`;

      const order = {
        email: user.email,
        items: cart,
        orderValue: orderValue,
        orderDate: Date.now(),
      };

      const response = await axios.post(url, order, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setCart([]);
      Navigate("/orders");
    }
  };

  return (
    <div className="cart-container">

      <h1 className="cart-title">🛒 My Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-items">

          {cart.map((item) => (
            <div className="cart-card" key={item._id}>

              <img
                src={`${API_URL}${item.imageUrl}`}
                alt={item.name}
                className="cart-img"
              />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div className="cart-quantity">
                <button onClick={() => decrement(item._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increment(item._id)}>+</button>
              </div>

              <div className="cart-subtotal">
                ₹{item.quantity * item.price}
              </div>

            </div>
          ))}

          <div className="cart-summary">

            <h2>Order Value: ₹{orderValue}</h2>

            {user?.email ? (
              <button className="place-order-btn" onClick={placeOrder}>
                Place Order
              </button>
            ) : (
              <button
                className="login-order-btn"
                onClick={() => Navigate("/login")}
              >
                Login to Order
              </button>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Cart;