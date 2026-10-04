import { Link } from "react-router-dom";

import menuData from "../data/menuData";
import useReveal from "../hooks/useReveal";

import "./FeaturedDishes.css";

function FeaturedDishes() {
  const [sectionRef, isVisible] = useReveal();

  const featuredDishes = menuData
    .filter((food) => food.featured)
    .slice(0, 6);

  return (
    <section
      ref={sectionRef}
      className={`featured-dishes ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="featured-container">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="featured-header">

          <div className="featured-heading">

            <span className="featured-eyebrow">
              FROM OUR KITCHEN
            </span>

            <h2>
              Nigerian favourites,
              <em> made with love.</em>
            </h2>

          </div>

          <p>
            From smoky suya to comforting jollof rice,
            discover some of the dishes our guests keep
            coming back for.
          </p>

        </div>


        {/* =================================================
            FEATURED FOOD
        ================================================= */}

        {featuredDishes.length > 0 ? (
          <div className="featured-grid">

            {featuredDishes.map((food, index) => (
              <article
                className="featured-card"
                key={food.id}
                style={{
                  "--card-delay": `${index * 90}ms`,
                }}
              >

                {/* Food image */}

                <Link
                  to={`/menu/${food.id}`}
                  className="featured-image-link"
                  aria-label={`View ${food.name}`}
                >
                  <div className="featured-image">

                    <img
                      src={food.image}
                      alt={food.name}
                      loading="lazy"
                    />

                    <div className="featured-image-overlay" />

                    <span className="featured-category">
                      {food.category}
                    </span>

                    <span
                      className="featured-view"
                      aria-hidden="true"
                    >
                      View
                    </span>

                  </div>
                </Link>


                {/* Food information */}

                <div className="featured-details">

                  <div className="featured-title-row">

                    <h3>
                      {food.name}
                    </h3>

                    <span className="featured-price">
                      ₦{Number(food.price).toLocaleString()}
                    </span>

                  </div>


                  <p>
                    {food.description}
                  </p>


                  <Link
                    to={`/menu/${food.id}`}
                    className="featured-order"
                  >
                    View dish

                    <span aria-hidden="true">
                      →
                    </span>
                  </Link>

                </div>

              </article>
            ))}

          </div>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="featured-empty">
            <p>
              Our featured dishes will appear here soon.
            </p>

            <Link to="/menu">
              Explore the menu →
            </Link>
          </div>
        )}


        {/* =================================================
            FOOTER CTA
        ================================================= */}

        <div className="featured-footer">

          <div className="featured-footer-line" />

          <Link
            to="/menu"
            className="featured-menu-link"
          >
            Explore the full menu

            <span aria-hidden="true">
              →
            </span>
          </Link>

          <div className="featured-footer-line" />

        </div>

      </div>
    </section>
  );
}

export default FeaturedDishes;