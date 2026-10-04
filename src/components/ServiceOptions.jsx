import useReveal from "../hooks/useReveal";

import "./ServiceOptions.css";

function ServiceOptions() {
  const [sectionRef, isVisible] = useReveal();

  const services = [
    {
      number: "01",
      title: "Dine In",
      description:
        "Take a seat, settle in and enjoy freshly prepared Nigerian meals in a warm restaurant atmosphere.",
      action: "Find a table",
      target: "#reservation",
    },
    {
      number: "02",
      title: "Pickup",
      description:
        "Order ahead and collect your meal when it is ready. Perfect when you're on the move.",
      action: "Order for pickup",
      target: "#menu",
    },
    {
      number: "03",
      title: "Delivery",
      description:
        "Enjoy your favourite CHOPHOUSE meals from wherever you are, delivered fresh to your door.",
      action: "Order delivery",
      target: "#menu",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`service-options ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="service-container">

        {/* Header */}
        <div className="service-header">
          <div>
            <span className="service-eyebrow">
              HOW WE SERVE
            </span>

            <h2>
              Your meal,
              <em> your way.</em>
            </h2>
          </div>

          <p>
            Whether you're sitting with friends, grabbing
            something on the way home, or ordering from
            your sofa, we've got you covered.
          </p>
        </div>


        {/* Services */}
        <div className="service-grid">

          {services.map((service, index) => (
            <article
              className="service-card"
              key={service.number}
              style={{
                "--service-delay": `${index * 120}ms`,
              }}
            >
              <div className="service-card-top">
                <span className="service-number">
                  {service.number}
                </span>

                <span className="service-arrow">
                  ↗
                </span>
              </div>

              <div className="service-card-content">
                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <a
                  href={service.target}
                  className="service-link"
                >
                  {service.action}
                  <span aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default ServiceOptions;