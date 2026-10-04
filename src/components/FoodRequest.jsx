import { useState } from "react";
import useReveal from "../hooks/useReveal";

import "./FoodRequest.css";

function FoodRequest() {
  const [sectionRef, isVisible] = useReveal();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    food: "",
    quantity: "1",
    preferredTime: "",
    service: "Pickup",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const buildRequestMessage = () => {
    return `Hello CHOPHOUSE 👋

I would like to ask about a food that I couldn't find on the menu.

Name: ${formData.name}
Phone: ${formData.phone}
Food requested: ${formData.food}
Quantity: ${formData.quantity}
Preferred time: ${formData.preferredTime || "Not specified"}
Service: ${formData.service}

Additional message:
${formData.message || "No additional message."}

Please let me know if this is available. Thank you.`;
  };

  const handleWhatsApp = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.phone || !formData.food) {
      return;
    }

    const message = encodeURIComponent(
      buildRequestMessage()
    );

    const whatsappNumber = "2349048889338";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );

    setSubmitted(true);
  };

  const handleEmail = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.phone || !formData.food) {
      return;
    }

    const subject = encodeURIComponent(
      `CHOPHOUSE Food Request - ${formData.food}`
    );

    const body = encodeURIComponent(
      buildRequestMessage()
    );

    window.location.href =
      `mailto:brightifeanyi683@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className={`food-request ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="food-request-container">

        {/* Intro */}
        <div className="food-request-intro">

          <span className="food-request-eyebrow">
            CAN'T FIND IT?
          </span>

          <h2>
            Tell us what
            <em> you're craving.</em>
          </h2>

          <p>
            Don't see what you're looking for on our menu?
            Tell us what you'd like and we'll check with
            the kitchen.
          </p>

          <div className="food-request-note">
            <span>CHOPHOUSE</span>
            <small>
              Your request goes directly to our team.
            </small>
          </div>

        </div>


        {/* Form */}
        <div className="food-request-form-wrap">

          <form className="food-request-form">

            <div className="request-form-grid">

              {/* Name */}
              <div className="request-field">
                <label htmlFor="request-name">
                  Your name
                </label>

                <input
                  id="request-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              {/* Phone */}
              <div className="request-field">
                <label htmlFor="request-phone">
                  WhatsApp / Phone
                </label>

                <input
                  id="request-phone"
                  name="phone"
                  type="tel"
                  placeholder="0801 234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>


              {/* Food */}
              <div className="request-field request-field-full">
                <label htmlFor="request-food">
                  What food are you looking for?
                </label>

                <input
                  id="request-food"
                  name="food"
                  type="text"
                  placeholder="e.g. Pepper soup, nkwobi, isi ewu..."
                  value={formData.food}
                  onChange={handleChange}
                  required
                />
              </div>


              {/* Quantity */}
              <div className="request-field">
                <label htmlFor="request-quantity">
                  Quantity
                </label>

                <input
                  id="request-quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>


              {/* Time */}
              <div className="request-field">
                <label htmlFor="request-time">
                  Preferred time
                </label>

                <input
                  id="request-time"
                  name="preferredTime"
                  type="text"
                  placeholder="e.g. 7:00 PM"
                  value={formData.preferredTime}
                  onChange={handleChange}
                />
              </div>


              {/* Service */}
              <div className="request-field request-field-full">
                <label>
                  How would you like to receive it?
                </label>

                <div className="service-options-row">

                  {[
                    "Pickup",
                    "Delivery",
                    "Dine In",
                  ].map((option) => (
                    <label
                      className={`service-option ${
                        formData.service === option
                          ? "active"
                          : ""
                      }`}
                      key={option}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={option}
                        checked={
                          formData.service === option
                        }
                        onChange={handleChange}
                      />

                      <span>
                        {option}
                      </span>
                    </label>
                  ))}

                </div>
              </div>


              {/* Message */}
              <div className="request-field request-field-full">
                <label htmlFor="request-message">
                  Additional message
                </label>

                <textarea
                  id="request-message"
                  name="message"
                  rows="4"
                  placeholder="Tell us anything else we should know..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

            </div>


            {/* Actions */}
            <div className="request-actions">

              <button
                type="button"
                className="request-whatsapp"
                onClick={handleWhatsApp}
              >
                Send via WhatsApp
                <span aria-hidden="true">↗</span>
              </button>

              <button
                type="button"
                className="request-email"
                onClick={handleEmail}
              >
                Send via Email
                <span aria-hidden="true">↗</span>
              </button>

            </div>


            {/* Confirmation */}
            {submitted && (
              <div
                className="request-success"
                role="status"
              >
                <strong>
                  Request prepared successfully.
                </strong>

                <span>
                  Your request has been sent to the
                  selected contact method. Our team will
                  get back to you shortly.
                </span>
              </div>
            )}

          </form>

        </div>

      </div>
    </section>
  );
}

export default FoodRequest;