import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">

      {/* Hero background */}
      <div className="hero-background">
        <img
          src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=2200&q=90"
          alt="Nigerian food"
        />
      </div>

      {/* Overlay */}
      <div className="hero-overlay" />

      <div className="hero-container">

        {/* Hero content */}
        <div className="hero-content">

          <div className="hero-eyebrow">
            <span />
            Nigerian Kitchen
          </div>

          <h1>
            The taste of
            <em>Nigeria.</em>
          </h1>

          <p className="hero-description">
            Authentic Nigerian dishes, bold African flavours,
            and meals made with the warmth of home.
          </p>

          <div className="hero-actions">

            {/* Scroll to menu */}
            <a
              href="#menu"
              className="hero-primary"
            >
              Order Now
              <span aria-hidden="true">→</span>
            </a>

            {/* Scroll to reservation */}
            <a
              href="#reservation"
              className="hero-secondary"
            >
              Reserve a Table
            </a>

          </div>

        </div>


        {/* Hero bottom */}
        <div className="hero-bottom">

          <div className="hero-location">

            <span
              className="location-icon"
              aria-hidden="true"
            >
              ●
            </span>

            <div>
              <small>
                Freshly prepared
              </small>

              <p>
                Dine in · Pickup · Delivery
              </p>
            </div>

          </div>


          <div className="hero-scroll">
            <span>
              Scroll to explore
            </span>

            <i />
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;