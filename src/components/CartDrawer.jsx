import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import CheckoutModal from "./CheckoutModal";

import "./CartDrawer.css";

function CartDrawer({ isOpen, onClose }) {
  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [unavailableItem, setUnavailableItem] =
    useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ========================================
  // GET FOOD ID
  // ========================================

  const getFoodId = (item) => {
    return item._id || item.id;
  };

  // ========================================
  // CHECK AVAILABILITY
  // ========================================

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    const unavailable = cartItems.find(
      (item) => item.available === false
    );

    if (unavailable) {
      setUnavailableItem(unavailable);
      return;
    }

    setCheckoutOpen(true);
  };

  // ========================================
  // CLOSE CHECKOUT
  // ========================================

  const closeCheckout = () => {
    setCheckoutOpen(false);
  };

  // ========================================
  // CLOSE UNAVAILABLE POPUP
  // ========================================

  const closeUnavailablePopup = () => {
    setUnavailableItem(null);
  };

  // ========================================
  // REMOVE UNAVAILABLE ITEM
  // ========================================

  const removeUnavailableItem = () => {
    if (!unavailableItem) {
      return;
    }

    removeFromCart(
      getFoodId(unavailableItem)
    );

    setUnavailableItem(null);
  };

  return (
    <>
      {/* ========================================
          CART OVERLAY
      ======================================== */}

      <div
        className={`cart-overlay ${
          isOpen ? "is-open" : ""
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ========================================
          CART DRAWER
      ======================================== */}

      <aside
        className={`cart-drawer ${
          isOpen ? "is-open" : ""
        }`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        {/* Header */}

        <div className="cart-header">
          <div>
            <span className="cart-eyebrow">
              YOUR ORDER
            </span>

            <h2>
              Cart
              <span> ({cartCount})</span>
            </h2>
          </div>

          <button
            type="button"
            className="cart-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                +
              </div>

              <h3>Your cart is empty</h3>

              <p>
                Add some of our Nigerian
                favourites and they'll appear
                here.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="cart-continue"
              >
                Explore the menu
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => {
                const foodId = getFoodId(item);

                return (
                  <article
                    className="cart-item"
                    key={foodId}
                  >
                    <div className="cart-item-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      {item.available ===
                        false && (
                        <span className="cart-unavailable-badge">
                          Unavailable
                        </span>
                      )}
                    </div>

                    <div className="cart-item-info">
                      <div className="cart-item-heading">
                        <h3>{item.name}</h3>

                        <button
                          type="button"
                          className="cart-remove"
                          onClick={() =>
                            removeFromCart(
                              foodId
                            )
                          }
                          aria-label={`Remove ${item.name}`}
                        >
                          ×
                        </button>
                      </div>

                      <span className="cart-item-price">
                        ₦
                        {Number(
                          item.price
                        ).toLocaleString()}
                      </span>

                      <div className="cart-item-bottom">
                        <div className="quantity-control">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                foodId
                              )
                            }
                            aria-label={`Decrease ${item.name}`}
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                foodId
                              )
                            }
                            aria-label={`Increase ${item.name}`}
                          >
                            +
                          </button>
                        </div>

                        <strong>
                          ₦
                          {(
                            Number(
                              item.price
                            ) *
                            item.quantity
                          ).toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================
            CART FOOTER
        ======================================== */}

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>

              <strong>
                ₦{cartTotal.toLocaleString()}
              </strong>
            </div>

            <button
              type="button"
              className="cart-checkout"
              onClick={handleCheckout}
            >
              Continue to checkout
              <span>→</span>
            </button>

            <small>
              Complete your order details before
              sending your order to CHOPHOUSE.
            </small>
          </div>
        )}
      </aside>

      {/* ========================================
          UNAVAILABLE FOOD POPUP
      ======================================== */}

      {unavailableItem && (
        <div
          className="cart-unavailable-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeUnavailablePopup();
            }
          }}
        >
          <div
            className="cart-unavailable-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="unavailable-title"
          >
            <div className="cart-unavailable-icon">
              !
            </div>

            <span className="cart-unavailable-eyebrow">
              ITEM UNAVAILABLE
            </span>

            <h2 id="unavailable-title">
              {unavailableItem.name}
            </h2>

            <p>
              Sorry, this dish is currently
              unavailable. Please remove it from
              your cart before continuing with
              your order.
            </p>

            <div className="cart-unavailable-actions">
              <button
                type="button"
                className="cart-popup-close"
                onClick={closeUnavailablePopup}
              >
                Okay
              </button>

              <button
                type="button"
                className="cart-popup-remove"
                onClick={
                  removeUnavailableItem
                }
              >
                Remove item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
          CHECKOUT MODAL
      ======================================== */}

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={closeCheckout}
      />
    </>
  );
}

export default CartDrawer;