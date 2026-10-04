import useReveal from "../hooks/useReveal";

import "./ReservationCTA.css";

function ReservationCTA() {
  const [sectionRef, isVisible] = useReveal();

  return (
    <section
      ref={sectionRef}
      id="reservation"
      className={`reservation-cta ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="reservation-cta-background">
        <img
          src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=85"
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      <div className="reservation-cta-overlay" />

      <div className="reservation-cta-container">
        <div className="reservation-content">

          <span className="reservation-eyebrow">
            COME HUNGRY
          </span>

          <h2>
            Good food is
            <em> better together.</em>
          </h2>

          <p>
            Bring your people, choose your favourites,
            and let us take care of the rest. Reserve a
            table and enjoy a proper Nigerian dining
            experience at CHOPHOUSE.
          </p>

          <div className="reservation-actions">

            <a
              href="#reservation-form"
              className="reservation-primary"
            >
              Reserve a Table
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="#menu"
              className="reservation-secondary"
            >
              Explore the Menu
            </a>

          </div>

        </div>

        <div className="reservation-details">

          <div>
            <span>OPENING HOURS</span>
            <strong>
              Mon – Sun
            </strong>
            <small>
              10:00 AM – 10:00 PM
            </small>
          </div>

          <div>
            <span>DINING OPTIONS</span>
            <strong>
              Dine · Pickup · Delivery
            </strong>
            <small>
              Freshly prepared every day
            </small>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ReservationCTA;