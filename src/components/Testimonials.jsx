import useReveal from "../hooks/useReveal";

import "./Testimonials.css";

function Testimonials() {
  const [sectionRef, isVisible] = useReveal();

  const testimonials = [
    {
      quote:
        "The jollof was seriously good. Everything tasted fresh and the portion was generous.",
      name: "Amaka O.",
      detail: "Lagos",
    },
    {
      quote:
        "CHOPHOUSE has that feeling of eating proper Nigerian food without losing the modern restaurant experience.",
      name: "Daniel E.",
      detail: "Port Harcourt",
    },
    {
      quote:
        "I ordered for delivery and the food arrived fresh, well packaged and still hot. Definitely ordering again.",
      name: "Chidinma N.",
      detail: "Owerri",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`testimonials ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="testimonials-container">

        {/* Header */}
        <div className="testimonials-header">
          <span className="testimonials-eyebrow">
            FROM OUR GUESTS
          </span>

          <h2>
            Good food
            <em> speaks for itself.</em>
          </h2>

          <p>
            From everyday meals to special occasions,
            here's what our guests have to say about
            their CHOPHOUSE experience.
          </p>
        </div>


        {/* Testimonials */}
        <div className="testimonials-grid">

          {testimonials.map((testimonial, index) => (
            <article
              className="testimonial-card"
              key={testimonial.name}
              style={{
                "--testimonial-delay": `${index * 120}ms`,
              }}
            >
              <div className="testimonial-top">

                <span className="testimonial-mark">
                  “
                </span>

                <div className="testimonial-stars">
                  ★★★★★
                </div>

              </div>

              <blockquote>
                {testimonial.quote}
              </blockquote>

              <div className="testimonial-author">
                <span className="testimonial-avatar">
                  {testimonial.name.charAt(0)}
                </span>

                <div>
                  <strong>
                    {testimonial.name}
                  </strong>

                  <small>
                    {testimonial.detail}
                  </small>
                </div>
              </div>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;