import { useState } from "react";

import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartCount } = useCart();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openCart = () => {
    setMenuOpen(false);
    setCartOpen(true);
  };

  return (
    <>
      <header className="site-navbar">
        <div className="navbar-container">

          {/* Brand */}
          <a
            href="#home"
            className="brand"
            onClick={closeMenu}
          >
            <span className="brand-mark">C</span>

            <span className="brand-text">
              CHOPHOUSE
            </span>
          </a>


          {/* Desktop navigation */}
          <nav className="desktop-nav">

            <a
              href="#home"
              className="nav-link"
            >
              Home
            </a>

            <a
              href="#menu"
              className="nav-link"
            >
              Menu
            </a>

            <a
              href="#story"
              className="nav-link"
            >
              Our Story
            </a>

            <a
              href="#contact"
              className="nav-link"
            >
              Contact
            </a>

          </nav>


          {/* Desktop actions */}
          <div className="navbar-actions">

            <button
              type="button"
              className="cart-link"
              onClick={openCart}
              aria-label={`Open cart with ${cartCount} items`}
            >
              Cart

              <span className="cart-count">
                {cartCount}
              </span>
            </button>

            <a
              href="#reservation"
              className="reserve-link"
            >
              Reserve a Table
            </a>

          </div>


          {/* Mobile button */}
          <button
            type="button"
            className={`menu-toggle ${
              menuOpen ? "is-open" : ""
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>

        </div>


        {/* Mobile navigation */}
        <div
          className={`mobile-navigation ${
            menuOpen ? "is-open" : ""
          }`}
        >

          <nav>

            <a
              href="#home"
              onClick={closeMenu}
            >
              Home
            </a>

            <a
              href="#menu"
              onClick={closeMenu}
            >
              Menu
            </a>

            <a
              href="#story"
              onClick={closeMenu}
            >
              Our Story
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
            >
              Contact
            </a>

          </nav>


          <div className="mobile-actions">

            <button
              type="button"
              className="mobile-cart"
              onClick={openCart}
            >
              Cart

              <span>
                {cartCount}
              </span>
            </button>

            <a
              href="#reservation"
              onClick={closeMenu}
              className="mobile-reserve"
            >
              Reserve a Table
            </a>

          </div>

        </div>

      </header>


      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}

export default Navbar;