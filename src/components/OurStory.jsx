import useReveal from "../hooks/useReveal";

import "./OurStory.css";

function OurStory() {
  const [sectionRef, isVisible] = useReveal();

  return (
    <section
      id="story"
      ref={sectionRef}
      className={`our-story ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="our-story-container">

        {/* Image */}
        <div className="story-image-wrap">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85"
              alt="Nigerian meal served at a restaurant"
              loading="lazy"
            />
          </div>

          <div className="story-image-note">
            <span className="story-note-number">
              01
            </span>

            <span className="story-note-text">
              Made with
              <strong>home in mind.</strong>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="story-content">
          <span className="story-eyebrow">
            OUR STORY
          </span>

          <h2>
            Food that feels
            <em> like home.</em>
          </h2>

          <div className="story-divider" />

          <p className="story-lead">
            Nigerian food is more than a meal. It is
            family, celebration, culture and memories
            served on one plate.
          </p>

          <p>
            At CHOPHOUSE, we bring the flavours we grew
            up with into a modern restaurant experience.
            From carefully prepared jollof rice to smoky
            suya and rich traditional soups, every dish
            is made to taste familiar while giving you
            something worth coming back for.
          </p>

          <p>
            Whether you are joining us for lunch, picking
            up dinner on your way home, or ordering from
            wherever you are, our kitchen is here to give
            you a proper taste of Nigeria.
          </p>

          <div className="story-bottom">
            <a
              href="#menu"
              className="story-link"
            >
              Explore our menu
              <span aria-hidden="true">
                →
              </span>
            </a>

            <div className="story-signature">
              <span>CHOPHOUSE</span>
              <small>
                The Taste of Nigeria
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="story-stats">

        <div className="story-stat">
          <strong>100%</strong>
          <span>Nigerian inspired</span>
        </div>

        <div className="story-stat">
          <strong>Fresh</strong>
          <span>Prepared daily</span>
        </div>

        <div className="story-stat">
          <strong>3 Ways</strong>
          <span>Dine · Pickup · Delivery</span>
        </div>

      </div>
    </section>
  );
}

export default OurStory;