import { useState } from "react";
import useReveal from "../hooks/useReveal";

import "./ReservationForm.css";

const API_URL = "http://localhost:5000/api";
const WHATSAPP_NUMBER = "2349048889338";

function ReservationForm() {
  const [sectionRef, isVisible] = useReveal();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    request: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const buildReservationMessage = () => {
    return `Hello CHOPHOUSE 👋

I would like to make a table reservation.

RESERVATION DETAILS

Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.time}
Number of guests: ${formData.guests}

Special request:
${formData.request || "None"}

Please confirm if the reservation is available.

Thank you.`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitted(false);

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!formData.date) {
      setError("Please select a reservation date.");
      return;
    }

    if (!formData.time) {
      setError("Please select a reservation time.");
      return;
    }

    setIsSubmitting(true);

    try {
      // ========================================
      // SAVE RESERVATION TO MONGODB
      // ========================================

      const response = await fetch(
        `${API_URL}/reservations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            date: formData.date,
            time: formData.time,
            guests: formData.guests,
            request: formData.request.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to submit your reservation."
        );
      }

      // ========================================
      // OPEN WHATSAPP
      // ========================================

      const message = encodeURIComponent(
        buildReservationMessage()
      );

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

      window.location.href = whatsappUrl;

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Reservation submission error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while submitting your reservation."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="reservation-form"
      ref={sectionRef}
      className={`reservation-form-section ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="reservation-form-container">

        {/* Intro */}

        <div className="reservation-form-intro">
          <span className="reservation-form-eyebrow">
            RESERVE YOUR TABLE
          </span>

          <h2>
            Good food,
            <em> good company.</em>
          </h2>

          <p>
            Planning a meal with friends, family, or someone
            special? Tell us when you'd like to visit and
            we'll help arrange your table.
          </p>

          <div className="reservation-info">
            <div>
              <span>OPENING HOURS</span>
              <strong>Monday – Sunday</strong>
              <small>10:00 AM – 10:00 PM</small>
            </div>

            <div>
              <span>DINING OPTIONS</span>
              <strong>Dine In</strong>
              <small>
                Comfortable seating for every occasion
              </small>
            </div>
          </div>
        </div>


        {/* Form */}

        <div className="reservation-form-wrap">
          <form
            className="reservation-form"
            onSubmit={handleSubmit}
          >

            <div className="reservation-fields">

              {/* Name */}

              <div className="reservation-field">
                <label htmlFor="reservation-name">
                  Your name
                </label>

                <input
                  id="reservation-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              {/* Phone */}

              <div className="reservation-field">
                <label htmlFor="reservation-phone">
                  WhatsApp / Phone
                </label>

                <input
                  id="reservation-phone"
                  name="phone"
                  type="tel"
                  placeholder="0801 234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>


              {/* Date */}

              <div className="reservation-field">
                <label htmlFor="reservation-date">
                  Date
                </label>

                <input
                  id="reservation-date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>


              {/* Time */}

              <div className="reservation-field">
                <label htmlFor="reservation-time">
                  Preferred time
                </label>

                <input
                  id="reservation-time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>


              {/* Guests */}

              <div className="reservation-field">
                <label htmlFor="reservation-guests">
                  Number of guests
                </label>

                <select
                  id="reservation-guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  <option value="1">
                    1 guest
                  </option>

                  <option value="2">
                    2 guests
                  </option>

                  <option value="3">
                    3 guests
                  </option>

                  <option value="4">
                    4 guests
                  </option>

                  <option value="5">
                    5 guests
                  </option>

                  <option value="6">
                    6 guests
                  </option>

                  <option value="7">
                    7 guests
                  </option>

                  <option value="8">
                    8 guests
                  </option>

                  <option value="9">
                    9 guests
                  </option>

                  <option value="10">
                    10 guests
                  </option>

                  <option value="10+">
                    10+ guests
                  </option>
                </select>
              </div>


              {/* Special request */}

              <div className="reservation-field reservation-field-full">
                <label htmlFor="reservation-request">
                  Special request
                </label>

                <textarea
                  id="reservation-request"
                  name="request"
                  rows="4"
                  placeholder="Anything we should know?"
                  value={formData.request}
                  onChange={handleChange}
                />
              </div>

            </div>


            {/* Error */}

            {error && (
              <div
                className="reservation-error"
                role="alert"
              >
                {error}
              </div>
            )}


            {/* Submit */}

            <button
              type="submit"
              className="reservation-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting reservation..."
                : "Request Reservation"}

              {!isSubmitting && (
                <span aria-hidden="true">
                  ↗
                </span>
              )}
            </button>


            {/* Success */}

            {submitted && (
              <div
                className="reservation-success"
                role="status"
              >
                <strong>
                  Reservation request submitted.
                </strong>

                <span>
                  Your reservation has been saved and
                  your details have been sent to WhatsApp.
                  Our team will confirm availability with you.
                </span>
              </div>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}

export default ReservationForm;