import { useState } from "react";
import { useCart } from "../context/CartContext";

import "./CheckoutModal.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const WHATSAPP_NUMBER = "2349048889338";

function CheckoutModal({ isOpen, onClose }) {
  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Pickup",
    address: "",
    note: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // FORM CHANGE
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // ========================================
  // BUILD WHATSAPP MESSAGE
  // ========================================

  const buildOrderMessage = (orderTotal = cartTotal) => {
    const items = cartItems
      .map(
        (item) =>
          `${item.name} × ${item.quantity} — ₦${(
            Number(item.price) * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    return `Hello CHOPHOUSE 👋

I would like to place an order.

CUSTOMER DETAILS
Name: ${formData.name.trim()}
Phone: ${formData.phone.trim()}
Service: ${formData.service}
${
  formData.service === "Delivery"
    ? `Delivery Address: ${formData.address.trim()}`
    : ""
}

ORDER
${items}

TOTAL: ₦${Number(orderTotal).toLocaleString()}

Additional note:
${formData.note.trim() || "None"}

Please confirm my order. Thank you.`;
  };

  // ========================================
  // OPEN WHATSAPP
  // ========================================

  const openWhatsApp = (orderTotal) => {
    const message = encodeURIComponent(
      buildOrderMessage(orderTotal)
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.location.href = whatsappUrl;
  };

  // ========================================
  // SUBMIT ORDER
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // ----------------------------------------
    // VALIDATION
    // ----------------------------------------

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (
      formData.service === "Delivery" &&
      !formData.address.trim()
    ) {
      setError(
        "Please enter your delivery address."
      );
      return;
    }

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    // ----------------------------------------
    // CHECK AVAILABILITY AGAIN
    // ----------------------------------------

    const unavailableItem = cartItems.find(
      (item) => item.available === false
    );

    if (unavailableItem) {
      setError(
        `${unavailableItem.name} is currently unavailable. Please remove it from your cart before placing your order.`
      );
      return;
    }

    // ----------------------------------------
    // START SUBMISSION
    // ----------------------------------------

    setIsSubmitting(true);

    try {
      const orderItems = cartItems.map((item) => ({
        menuItem: item._id || item.id,
        quantity: item.quantity,
      }));

      // ----------------------------------------
      // SAVE ORDER TO MONGODB
      // ----------------------------------------

      const response = await fetch(
        `${API_URL}/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            customer: {
              name: formData.name.trim(),
              phone: formData.phone.trim(),
            },

            service: formData.service,

            address:
              formData.service === "Delivery"
                ? formData.address.trim()
                : "",

            note: formData.note.trim(),

            items: orderItems,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to place your order."
        );
      }

      const savedOrder = result.data;

      // ----------------------------------------
      // CLEAR CART
      // ----------------------------------------

      clearCart();

      // ----------------------------------------
      // SHOW SUCCESS STATE
      // ----------------------------------------

      setSubmitted(true);

      // ----------------------------------------
      // OPEN WHATSAPP
      // ----------------------------------------

      openWhatsApp(savedOrder.total);
    } catch (error) {
      console.error(
        "Order submission error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while placing your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================================
  // CLOSE / RESET
  // ========================================

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    setSubmitted(false);
    setError("");

    setFormData({
      name: "",
      phone: "",
      service: "Pickup",
      address: "",
      note: "",
    });

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="checkout-modal-overlay">
      <div
        className="checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <div className="checkout-header">
          <div>
            <span className="checkout-eyebrow">
              COMPLETE YOUR ORDER
            </span>

            <h2 id="checkout-title">
              Order details
            </h2>
          </div>

          <button
            type="button"
            className="checkout-close"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close checkout"
          >
            ×
          </button>
        </div>

        {/* ========================================
            FORM
        ======================================== */}

        {!submitted ? (
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            {/* ORDER SUMMARY */}

            <div className="checkout-summary">
              <span>
                {cartItems.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}{" "}
                item(s)
              </span>

              <strong>
                ₦{cartTotal.toLocaleString()}
              </strong>
            </div>

            {/* ERROR */}

            {error && (
              <div
                className="checkout-error"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* FIELDS */}

            <div className="checkout-fields">
              {/* NAME */}

              <div className="checkout-field">
                <label htmlFor="checkout-name">
                  Your name
                </label>

                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              {/* PHONE */}

              <div className="checkout-field">
                <label htmlFor="checkout-phone">
                  Phone / WhatsApp
                </label>

                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  placeholder="0801 234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />
              </div>

              {/* SERVICE */}

              <div className="checkout-field checkout-full">
                <label>
                  How would you like to receive
                  your order?
                </label>

                <div className="checkout-services">
                  {["Pickup", "Delivery"].map(
                    (option) => (
                      <label
                        key={option}
                        className={`checkout-service ${
                          formData.service ===
                          option
                            ? "active"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={option}
                          checked={
                            formData.service ===
                            option
                          }
                          onChange={handleChange}
                        />

                        <span>
                          {option}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* DELIVERY ADDRESS */}

              {formData.service ===
                "Delivery" && (
                <div className="checkout-field checkout-full">
                  <label htmlFor="checkout-address">
                    Delivery address
                  </label>

                  <textarea
                    id="checkout-address"
                    name="address"
                    rows="3"
                    placeholder="Enter your delivery address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* NOTE */}

              <div className="checkout-field checkout-full">
                <label htmlFor="checkout-note">
                  Additional note
                </label>

                <textarea
                  id="checkout-note"
                  name="note"
                  rows="3"
                  placeholder="Anything else we should know?"
                  value={formData.note}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="checkout-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Placing order..."
                : "Confirm & Order via WhatsApp"}

              {!isSubmitting && (
                <span>↗</span>
              )}
            </button>

            <small className="checkout-note">
              Your order will be saved securely
              and your order details will be sent
              to CHOPHOUSE through WhatsApp.
            </small>
          </form>
        ) : (
          /* ========================================
             SUCCESS
          ======================================== */

          <div className="checkout-success">
            <div className="checkout-success-icon">
              ✓
            </div>

            <h3>Order request sent</h3>

            <p>
              Your order has been saved successfully
              and your order details have been sent
              to CHOPHOUSE on WhatsApp.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="checkout-done"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;