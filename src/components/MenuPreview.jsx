import { useEffect, useMemo, useState } from "react";

import { useCart } from "../context/CartContext";

import "./MenuPreview.css";

function MenuPreview() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  const categories = [
    "All",
    "Rice",
    "Swallow",
    "Soups",
    "Proteins",
    "African Specials",
    "Breakfast",
    "Sides",
    "Snacks",
    "Drinks",
  ];

  // ========================================
  // FETCH MENU FROM BACKEND
  // ========================================

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const API_URL =
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000/api";

        const response = await fetch(`${API_URL}/menu`);

        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Failed to fetch menu"
          );
        }

        setMenuItems(result.data);
      } catch (error) {
        console.error("Menu fetch error:", error);

        setError(
          "We couldn't load the menu right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // ========================================
  // FILTER MENU
  // ========================================

  const filteredFoods = useMemo(() => {
    if (activeCategory === "All") {
      return menuItems.slice(0, 8);
    }

    return menuItems.filter(
      (food) => food.category === activeCategory
    );
  }, [activeCategory, menuItems]);

  return (
    <section className="menu-preview" id="menu">
      <div className="menu-preview-container">

        {/* Header */}
        <div className="menu-preview-header">
          <div>
            <span className="menu-preview-eyebrow">
              OUR MENU
            </span>

            <h2>
              Something for
              <em> every craving.</em>
            </h2>
          </div>

          <p>
            From classic Nigerian favourites to
            comforting African dishes, every plate
            is prepared with care.
          </p>
        </div>

        {/* Categories */}
        <div className="menu-categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="menu-status">
            <span className="menu-loader" />
            <p>Loading our menu...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="menu-status menu-status-error">
            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          filteredFoods.length === 0 && (
            <div className="menu-status">
              <p>
                No dishes found in this category.
              </p>
            </div>
          )}

        {/* Menu Grid */}
        {!loading &&
          !error &&
          filteredFoods.length > 0 && (
            <div className="menu-preview-grid">
              {filteredFoods.map((food) => (
                <article
                  className="food-card"
                  key={food._id}
                >
                  <div className="food-card-image">
                    <img
                      src={food.image}
                      alt={food.name}
                      loading="lazy"
                    />

                    <span className="food-card-category">
                      {food.category}
                    </span>
                  </div>

                  <div className="food-card-content">
                    <div className="food-card-top">
                      <h3>{food.name}</h3>

                      <span className="food-card-price">
                        ₦
                        {Number(
                          food.price
                        ).toLocaleString()}
                      </span>
                    </div>

                    <p>
                      {food.description}
                    </p>

                    <button
                      type="button"
                      className="food-card-order"
                      onClick={() =>
                        addToCart(food)
                      }
                    >
                      Add to order

                      <span aria-hidden="true">
                        +
                      </span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

        {/* Menu Footer */}
        {!loading &&
          !error &&
          activeCategory === "All" &&
          menuItems.length > 8 && (
            <div className="menu-preview-footer">
              <span>
                Showing 8 of {menuItems.length} dishes
              </span>

              <span>
                Explore the categories above
              </span>
            </div>
          )}

      </div>
    </section>
  );
}

export default MenuPreview;