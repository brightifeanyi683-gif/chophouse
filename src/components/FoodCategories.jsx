import { Link } from "react-router-dom";

import "./FoodCategories.css";

const categories = [
  {
    id: 1,
    name: "Rice",
    description: "Jollof, fried rice & more",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 2,
    name: "Soups",
    description: "Rich Nigerian soups",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 3,
    name: "Swallow",
    description: "Eba, pounded yam & more",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 4,
    name: "Grills",
    description: "Suya, chicken & fish",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 5,
    name: "Breakfast",
    description: "Start your day right",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 6,
    name: "Drinks",
    description: "Zobo, Chapman & more",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85",
  },
];

function FoodCategories() {
  return (
    <section className="food-categories">

      <div className="food-categories-container">

        {/* Header */}

        <div className="categories-header">

          <div>
            <span className="categories-eyebrow">
              EXPLORE OUR MENU
            </span>

            <h2>
              What are you
              <em> craving?</em>
            </h2>
          </div>

          <a
            href="#menu"
            className="categories-link"
          >
            View full menu
            <span>→</span>
          </a>

        </div>


        {/* Categories */}

        <div className="categories-grid">

          {categories.map((category, index) => (

            <Link
              to={`/menu?category=${category.name}`}
              className="category-card"
              key={category.id}
              style={{
                "--delay": `${index * 80}ms`,
              }}
            >

              <div className="category-image">

                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />

                <div className="category-image-overlay" />

              </div>


              <div className="category-content">

                <div>
                  <h3>
                    {category.name}
                  </h3>

                  <p>
                    {category.description}
                  </p>
                </div>

                <span className="category-arrow">
                  →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FoodCategories;