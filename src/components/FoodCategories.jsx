import { Link } from "react-router-dom";

import "./FoodCategories.css";

const categories = [
  {
    id: 1,
    name: "Rice",
    description: "Jollof, fried rice & more",
    image:
      "https://i.pinimg.com/1200x/d7/ff/8c/d7ff8c0a61814346f91a8268044c6589.jpg",
  },

  {
    id: 2,
    name: "Soups",
    description: "Rich Nigerian soups",
    image:
      "https://i.pinimg.com/736x/26/0c/19/260c19d9918d7fd4959e3ad06e61d94f.jpg",
  },

  {
    id: 3,
    name: "Swallow",
    description: "Eba, pounded yam & more",
    image:
      "https://i.pinimg.com/736x/c4/4f/a9/c44fa94a307ba1a54715fe56ca873bd8.jpg",
  },

  {
    id: 4,
    name: "Grills",
    description: "Suya, chicken & fish",
    image:
      "https://i.pinimg.com/1200x/16/23/70/162370cdceed0d0fa39dee4dc673fc97.jpg",
  },

  {
    id: 5,
    name: "Breakfast",
    description: "Start your day right",
    image:
      "https://i.pinimg.com/736x/5b/2c/a8/5b2ca89ce2e5eeaf882e72b21cbc51c1.jpg",
  },

  {
    id: 6,
    name: "Drinks",
    description: "Zobo, Chapman & more",
    image:
      "https://i.pinimg.com/736x/a6/83/47/a68347315e1e13399234c1957982237f.jpg",
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

           <a
              href="#menu"
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
                  <h3>{category.name}</h3>

                  <p>{category.description}</p>
                </div>

                <span className="category-arrow">
                  →
                </span>
              </div>
       </a>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FoodCategories;