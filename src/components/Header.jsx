import "./Header.css";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  const { user, cart } = useContext(AppContext);

  return (
    <div className="header">

    <NavLink to="/" className="logo">
      ☕ Bakingo
    </NavLink>

      <ul className="nav-links">

        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li className="cart-icon">
          <NavLink to="/cart">
            <FaShoppingCart />

            {cart?.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </NavLink>
        </li>

        {user?.email ? (
          <>
            <li>
              <NavLink to="/orders">Orders</NavLink>
            </li>

            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">Sign In</NavLink>
          </li>
        )}

      </ul>

    </div>
  );
}

export default Header;