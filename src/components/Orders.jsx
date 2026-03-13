import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Orders.css";

function Orders() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/orders/${user.email}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">

      <h1 className="orders-title">📦 My Orders</h1>

      <div className="orders-list">

        {orders &&
          orders.map((order) => (
            <div className="order-card" key={order._id}>

              <h3 className="order-id">
                Order Id: {order.orderDate}
              </h3>

              <div className="order-items">

                <ol>
                  {order.items.map((item) => (
                    <li key={item._id} className="order-item">

                      <span className="item-name">
                        {item.name}
                      </span>

                      <span className="item-details">
                        ₹{item.price} × {item.quantity}
                      </span>

                      <span className="item-total">
                        ₹{item.price * item.quantity}
                      </span>

                    </li>
                  ))}
                </ol>

              </div>

              <div className="order-total">
                <h3>Order Value: ₹{order.orderValue}</h3>
              </div>

            </div>
          ))}

      </div>

    </div>
  );
}

export default Orders;