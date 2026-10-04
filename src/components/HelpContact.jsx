import { useState } from "react";
import useReveal from "../hooks/useReveal";

import "./HelpContact.css";

const API_URL = "http://localhost:5000/api";

function HelpContact() {
  const [sectionRef, isVisible] = useReveal();

  const [showEmailForm, setShowEmailForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const contactOptions = [
    {
      number: "01",
      title: "WhatsApp",
      description:
        "Need help with an order, food request, reservation, or anything else? Chat with our team directly.",
      action: "Chat on WhatsApp",
      href: "https://wa.me/2349048889338",
      external: true,
      type: "link",
    },
    {
      number: "02",
      title: "Email Us",
      description:
        "Send us your questions, feedback, or enquiries and we'll get back to you.",
      action: "Send an email",
      type: "email",
    },
    {
      number: "03",
      title: "Call Us",
      description:
        "Prefer to speak with someone? Give us a call during our opening hours.",
      action: "0904 888 9338",
      href: "tel:+2349048889338",
      external: false,
      type: "link",
    },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleEmailClick = () => {
    setShowEmailForm((previous) => !previous);

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage(
        "Please fill in your name, email address, and message."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to send your message."
        );
      }

      setSuccessMessage(
        "Message sent successfully. A confirmation email has been sent to you."
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`help-contact ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="help-contact-container">

        {/* Header */}
        <div className="help-contact-header">
          <span className="help-contact-eyebrow">
            NEED SOME HELP?
          </span>

          <h2>
            We're here to
            <em> help.</em>
          </h2>

          <p>
            Have a question about your order, our menu,
            reservations, delivery, or anything else?
            Reach out and our team will be happy to assist.
          </p>
        </div>

        {/* Contact Options */}
        <div className="help-contact-grid">
          {contactOptions.map((option, index) => (
            <article
              className="help-contact-card"
              key={option.number}
              style={{
                "--contact-delay": `${index * 100}ms`,
              }}
            >
              <div className="help-contact-card-top">
                <span className="help-contact-number">
                  {option.number}
                </span>

                <span
                  className="help-contact-icon"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>

              <div className="help-contact-card-content">
                <h3>{option.title}</h3>

                <p>{option.description}</p>

                {option.type === "email" ? (
                  <button
                    type="button"
                    className="help-contact-link help-contact-email-button"
                    onClick={handleEmailClick}
                  >
                    {option.action}

                    <span aria-hidden="true">
                      →
                    </span>
                  </button>
                ) : (
                  <a
                    href={option.href}
                    className="help-contact-link"
                    {...(option.external
                      ? {
                          target: "_blank",
                          rel: "noreferrer",
                        }
                      : {})}
                  >
                    {option.action}

                    <span aria-hidden="true">
                      →
                    </span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Email Form */}
        {showEmailForm && (
          <div className="help-contact-form-wrapper">
            <div className="help-contact-form-header">
              <div>
                <span className="help-contact-eyebrow">
                  EMAIL US
                </span>

                <h3>
                  Send us a message.
                </h3>

                <p>
                  Fill in the form below and we'll send
                  you a confirmation email.
                </p>
              </div>

              <button
                type="button"
                className="help-contact-form-close"
                onClick={() => setShowEmailForm(false)}
                aria-label="Close email form"
              >
                ×
              </button>
            </div>

            <form
              className="help-contact-form"
              onSubmit={handleSubmit}
            >
              <div className="help-contact-form-grid">
                <label>
                  <span>Your name</span>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    disabled={isSubmitting}
                  />
                </label>

                <label>
                  <span>Email address</span>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    disabled={isSubmitting}
                  />
                </label>
              </div>

              <label>
                <span>Your message</span>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help?"
                  rows="6"
                  disabled={isSubmitting}
                />
              </label>

              {errorMessage && (
                <div className="help-contact-form-message error">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="help-contact-form-message success">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                className="help-contact-submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Sending..."
                  : "Send Message"}

                <span aria-hidden="true">
                  →
                </span>
              </button>
            </form>
          </div>
        )}

        {/* Bottom Information */}
        <div className="help-contact-bottom">

          <div className="help-contact-hours">
            <span className="hours-label">
              OPENING HOURS
            </span>

            <strong>Monday – Sunday</strong>

            <span>10:00 AM – 10:00 PM</span>
          </div>

          <div className="help-contact-location">
            <span className="hours-label">
              CHOPHOUSE
            </span>

            <strong>
              The Taste of Nigeria
            </strong>

            <span>
              Dine In · Pickup · Delivery
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HelpContact;