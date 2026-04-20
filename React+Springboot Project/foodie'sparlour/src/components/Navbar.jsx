import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🍔 Foodie's Parlour
        </Link>

        {/* Center: Home and Menu */}
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item mx-3">
              <Link className="nav-link fw-semibold" to="/">Home</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fw-semibold" to="/menu">Menu</Link>
            </li>
          </ul>
        </div>

        {/* Right Side: Cart + Login + Signup */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Cart Icon - Bigger */}
          <Link to="/cart" className="nav-link position-relative fs-4">
            🛒
            {totalItems > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>

          {/* Login - White Button with Black Text */}
          <Link 
            to="/login" 
            className="btn btn-light text-dark fw-semibold px-4 py-2"
          >
            Login
          </Link>

          {/* Signup - Grey Button with Black Text */}
          <Link 
            to="/register" 
            className="btn btn-secondary text-dark fw-semibold px-4 py-2"
          >
            Sign Up
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;