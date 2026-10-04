import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">

        {/* =========================
            FOOTER TOP
        ========================= */}

        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <a
              href="#home"
              className="footer-logo"
            >
              CHOP<span>HOUSE</span>
            </a>

            <p>
              Authentic Nigerian dishes, bold African
              flavours, and meals made with the warmth
              of home.
            </p>

            <span className="footer-tagline">
              The Taste of Nigeria.
            </span>
          </div>


          {/* Explore */}
          <div className="footer-column">
            <h3>Explore</h3>

            <a href="#home">
              Home
            </a>

            <a href="#menu">
              Menu
            </a>

            <a href="#story">
              Our Story
            </a>

            <a href="#reservation">
              Reservations
            </a>
          </div>


          {/* Services */}
          <div className="footer-column">
            <h3>Services</h3>

            <a href="#menu">
              Order Food
            </a>

            <a href="#menu">
              Pickup
            </a>

            <a href="#menu">
              Delivery
            </a>

            <a href="#food-request">
              Food Request
            </a>
          </div>


          {/* Contact */}
          <div className="footer-column footer-contact">
            <h3>Contact</h3>

            <a href="tel:+2349048889338">
              0904 888 9338
            </a>

            <a href="mailto:brightifeanyi683@gmail.com">
              brightifeanyi683@gmail.com
            </a>

            <span>
              Monday – Sunday
              <br />
              10:00 AM – 10:00 PM
            </span>
          </div>

        </div>


        {/* =========================
            DIVIDER
        ========================= */}

        <div className="footer-divider" />


        {/* =========================
            FOOTER BOTTOM
        ========================= */}

        <div className="footer-bottom">

          <p>
            © {currentYear} CHOPHOUSE.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <a href="#home">
              Back to top ↑
            </a>
          </div>

          <p className="footer-credit">
            Crafted with care.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;