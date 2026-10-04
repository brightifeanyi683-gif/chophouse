import { useEffect, useMemo, useState } from "react";
import "./AdminDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Ready",
  "Completed",
  "Cancelled",
];

const RESERVATION_STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Cancelled",
  "Completed",
];

function AdminDashboard() {
  // ========================================
  // ORDERS
  // ========================================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState(null);

  // ========================================
  // RESERVATIONS
  // ========================================

  const [reservations, setReservations] = useState([]);
  const [reservationsLoading, setReservationsLoading] =
    useState(true);
  const [reservationError, setReservationError] =
    useState("");
  const [updatingReservation, setUpdatingReservation] =
    useState(null);

  const [reservationSearchTerm, setReservationSearchTerm] =
    useState("");

  const [reservationStatusFilter, setReservationStatusFilter] =
    useState("All");

  // ========================================
  // ADMIN
  // ========================================

  const [admin, setAdmin] = useState(null);

  // ========================================
  // ORDER FILTERS
  // ========================================

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ========================================
  // AUTH
  // ========================================

  const getToken = () => {
    return localStorage.getItem("chophouse_admin_token");
  };

  const logout = () => {
    localStorage.removeItem("chophouse_admin_token");
    localStorage.removeItem("chophouse_admin");

    window.location.href = "/admin/login";
  };

  const handleUnauthorized = () => {
    localStorage.removeItem("chophouse_admin_token");
    localStorage.removeItem("chophouse_admin");

    window.location.href = "/admin/login";
  };

  // ========================================
  // FETCH ORDERS
  // ========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        handleUnauthorized();
        return;
      }

      const response = await fetch(`${API_URL}/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to fetch orders"
        );
      }

      setOrders(result.data || []);
    } catch (error) {
      console.error("Orders fetch error:", error);

      setError(
        "We couldn't load the orders. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // FETCH RESERVATIONS
  // ========================================

  const fetchReservations = async () => {
    try {
      setReservationsLoading(true);
      setReservationError("");

      const token = getToken();

      if (!token) {
        handleUnauthorized();
        return;
      }

      const response = await fetch(
        `${API_URL}/reservations`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to fetch reservations"
        );
      }

      setReservations(result.data || []);
    } catch (error) {
      console.error(
        "Reservations fetch error:",
        error
      );

      setReservationError(
        "We couldn't load the reservations. Please make sure the backend is running."
      );
    } finally {
      setReservationsLoading(false);
    }
  };

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    const storedAdmin =
      localStorage.getItem("chophouse_admin");

    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.error(
          "Admin data error:",
          error
        );
      }
    }

    fetchOrders();
    fetchReservations();
  }, []);

  // ========================================
  // UPDATE ORDER STATUS
  // ========================================

  const updateOrderStatus = async (
    orderId,
    status
  ) => {
    try {
      setUpdatingOrder(orderId);
      setError("");

      const token = getToken();

      if (!token) {
        handleUnauthorized();
        return;
      }

      const response = await fetch(
        `${API_URL}/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to update order status"
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: result.data.status,
              }
            : order
        )
      );
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      setError(
        error.message ||
          "Unable to update order status."
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  // ========================================
  // UPDATE RESERVATION STATUS
  // ========================================

  const updateReservationStatus = async (
    reservationId,
    status
  ) => {
    try {
      setUpdatingReservation(reservationId);
      setReservationError("");

      const token = getToken();

      if (!token) {
        handleUnauthorized();
        return;
      }

      const response = await fetch(
        `${API_URL}/reservations/${reservationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to update reservation status"
        );
      }

      setReservations((currentReservations) =>
        currentReservations.map((reservation) =>
          reservation._id === reservationId
            ? {
                ...reservation,
                status: result.data.status,
              }
            : reservation
        )
      );
    } catch (error) {
      console.error(
        "Reservation status update error:",
        error
      );

      setReservationError(
        error.message ||
          "Unable to update reservation status."
      );
    } finally {
      setUpdatingReservation(null);
    }
  };

  // ========================================
  // ORDER STATS
  // ========================================

  const stats = useMemo(() => {
    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order) => order.status === "Pending"
    ).length;

    const completedOrders = orders.filter(
      (order) => order.status === "Completed"
    ).length;

    const totalSales = orders
      .filter(
        (order) => order.status !== "Cancelled"
      )
      .reduce(
        (total, order) =>
          total + Number(order.total || 0),
        0
      );

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalSales,
    };
  }, [orders]);

  // ========================================
  // RESERVATION STATS
  // ========================================

  const reservationStats = useMemo(() => {
    const totalReservations =
      reservations.length;

    const pendingReservations =
      reservations.filter(
        (reservation) =>
          reservation.status === "Pending"
      ).length;

    const confirmedReservations =
      reservations.filter(
        (reservation) =>
          reservation.status === "Confirmed"
      ).length;

    const cancelledReservations =
      reservations.filter(
        (reservation) =>
          reservation.status === "Cancelled"
      ).length;

    return {
      totalReservations,
      pendingReservations,
      confirmedReservations,
      cancelledReservations,
    };
  }, [reservations]);

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString(
      "en-NG",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  // ========================================
  // FORMAT RESERVATION DATE
  // ========================================

  const formatReservationDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(
      `${date}T00:00:00`
    );

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-NG",
      {
        dateStyle: "medium",
      }
    );
  };

  // ========================================
  // FORMAT RESERVATION TIME
  // ========================================

  const formatReservationTime = (time) => {
    if (!time) return "—";

    const [hours, minutes] =
      time.split(":");

    const hour = Number(hours);

    if (Number.isNaN(hour)) {
      return time;
    }

    const suffix =
      hour >= 12 ? "PM" : "AM";

    const formattedHour =
      hour % 12 || 12;

    return `${formattedHour}:${minutes} ${suffix}`;
  };

  // ========================================
  // STATUS CLASS
  // ========================================

  const getStatusClass = (status) => {
    return status
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  // ========================================
  // ORDER CONTACT HELPERS
  // ========================================

  const getOrderWhatsAppNumber = (phone) => {
    if (!phone) return "";

    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("234")) {
      return cleaned;
    }

    if (cleaned.startsWith("0")) {
      return `234${cleaned.slice(1)}`;
    }

    return cleaned;
  };

  const buildOrderWhatsAppMessage = (order) => {
    const name =
      order.customer?.name ||
      "Customer";

    return `Hello ${name} 👋

This is CHOPHOUSE regarding your order.

ORDER DETAILS

Order: #${
      order._id?.slice(-6).toUpperCase() ||
      "—"
    }
Service: ${order.service || "—"}
Total: ₦${Number(
      order.total || 0
    ).toLocaleString()}
Status: ${order.status || "Pending"}

Please let us know if you have any questions about your order.

Thank you,
CHOPHOUSE
The Taste of Nigeria`;
  };

  // ========================================
  // RESERVATION CONTACT HELPERS
  // ========================================

  const getWhatsAppNumber = (phone) => {
    if (!phone) return "";

    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("234")) {
      return cleaned;
    }

    if (cleaned.startsWith("0")) {
      return `234${cleaned.slice(1)}`;
    }

    return cleaned;
  };

  const buildReservationWhatsAppMessage = (
    reservation
  ) => {
    const name =
      reservation.customer?.name ||
      "Customer";

    return `Hello ${name} 👋

This is CHOPHOUSE regarding your table reservation.

RESERVATION DETAILS

Date: ${formatReservationDate(
      reservation.date
    )}
Time: ${formatReservationTime(
      reservation.time
    )}
Guests: ${reservation.guests}

${
  reservation.request
    ? `Special request: ${reservation.request}`
    : ""
}

Please let us know if you have any questions.

Thank you,
CHOPHOUSE
The Taste of Nigeria`;
  };

  // ========================================
  // FILTER ORDERS
  // ========================================

  const filteredOrders = orders.filter(
    (order) => {
      const search =
        searchTerm.toLowerCase().trim();

      const customerName =
        order.customer?.name?.toLowerCase() ||
        "";

      const customerPhone =
        order.customer?.phone?.toLowerCase() ||
        "";

      const matchesSearch =
        !search ||
        customerName.includes(search) ||
        customerPhone.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    }
  );

  // ========================================
  // FILTER RESERVATIONS
  // ========================================

  const filteredReservations =
    reservations.filter(
      (reservation) => {
        const search =
          reservationSearchTerm
            .toLowerCase()
            .trim();

        const customerName =
          reservation.customer?.name?.toLowerCase() ||
          "";

        const customerPhone =
          reservation.customer?.phone?.toLowerCase() ||
          "";

        const matchesSearch =
          !search ||
          customerName.includes(search) ||
          customerPhone.includes(search);

        const matchesStatus =
          reservationStatusFilter ===
            "All" ||
          reservation.status ===
            reservationStatusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  // ========================================
  // REFRESH EVERYTHING
  // ========================================

  const refreshDashboard = async () => {
    await Promise.all([
      fetchOrders(),
      fetchReservations(),
    ]);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <main className="admin-dashboard">
      <div className="admin-container">

        {/* ========================================
            HEADER
        ======================================== */}

        <header className="admin-header">
          <div>
            <span className="admin-eyebrow">
              CHOPHOUSE ADMIN
            </span>

            <h1>Restaurant Dashboard</h1>

            <p>
              Manage customer orders,
              reservations, and keep track
              of your restaurant activity.
            </p>

            {admin?.name && (
              <div className="admin-welcome">
                Welcome back,{" "}
                <strong>
                  {admin.name}
                </strong>
              </div>
            )}
          </div>

          <div className="admin-header-actions">

            {/* MANAGE MENU */}

            <button
              type="button"
              className="admin-manage-menu"
              onClick={() => {
                window.location.href =
                  "/admin/menu";
              }}
            >
              Manage Menu
            </button>

            {/* REFRESH */}

            <button
              type="button"
              className="admin-refresh"
              onClick={refreshDashboard}
              disabled={
                loading ||
                reservationsLoading
              }
            >
              ↻{" "}
              {loading ||
              reservationsLoading
                ? "Refreshing..."
                : "Refresh dashboard"}
            </button>

            {/* LOGOUT */}

            <button
              type="button"
              className="admin-logout"
              onClick={logout}
            >
              Logout
            </button>

          </div>
        </header>

        {/* ========================================
            ORDER ERROR
        ======================================== */}

        {error && (
          <div className="admin-error">
            <span>!</span>

            <p>{error}</p>

            <button
              type="button"
              onClick={fetchOrders}
            >
              Try again
            </button>
          </div>
        )}

        {/* ========================================
            ORDER STATS
        ======================================== */}

        <section className="admin-stats">

          <article className="admin-stat-card">
            <span className="admin-stat-label">
              Total orders
            </span>

            <strong>
              {stats.totalOrders}
            </strong>

            <small>
              All customer orders
            </small>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-label">
              Pending
            </span>

            <strong>
              {stats.pendingOrders}
            </strong>

            <small>
              Orders waiting for action
            </small>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-label">
              Completed
            </span>

            <strong>
              {stats.completedOrders}
            </strong>

            <small>
              Successfully completed
            </small>
          </article>

          <article className="admin-stat-card admin-stat-sales">
            <span className="admin-stat-label">
              Total sales
            </span>

            <strong>
              ₦
              {stats.totalSales.toLocaleString()}
            </strong>

            <small>
              Excluding cancelled orders
            </small>
          </article>

        </section>

        {/* ========================================
            ORDERS
        ======================================== */}

        <section className="admin-orders-section">

          <div className="admin-section-header">
            <div>
              <span className="admin-section-eyebrow">
                ORDERS
              </span>

              <h2>
                Recent customer orders
              </h2>
            </div>

            <span className="admin-order-count">
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1
                ? "order"
                : "orders"}
            </span>
          </div>

          {/* SEARCH + FILTERS */}

          <div className="admin-order-filters">

            <div className="admin-search-wrapper">

              <span
                className="admin-search-icon"
                aria-hidden="true"
              >
                ⌕
              </span>

              <input
                type="search"
                placeholder="Search customer name or phone..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                aria-label="Search orders"
              />

              {searchTerm && (
                <button
                  type="button"
                  className="admin-search-clear"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}

            </div>

            <div
              className="admin-status-filters"
              role="group"
              aria-label="Filter orders by status"
            >
              {[
                "All",
                ...STATUS_OPTIONS,
              ].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={
                    statusFilter === status
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setStatusFilter(status)
                  }
                  aria-pressed={
                    statusFilter === status
                  }
                >
                  {status}
                </button>
              ))}
            </div>

          </div>

          {/* LOADING */}

          {loading ? (

            <div className="admin-empty">
              <div className="admin-spinner" />

              <p>
                Loading orders...
              </p>
            </div>

          ) : filteredOrders.length === 0 ? (

            <div className="admin-empty">

              <div className="admin-empty-icon">
                🧾
              </div>

              <h3>
                {orders.length === 0
                  ? "No orders yet"
                  : "No matching orders"}
              </h3>

              <p>
                {orders.length === 0
                  ? "Customer orders will appear here when they place an order."
                  : "Try a different search term or status filter."}
              </p>

              {orders.length > 0 && (
                <button
                  type="button"
                  className="admin-clear-filters"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("All");
                  }}
                >
                  Clear filters
                </button>
              )}

            </div>

          ) : (

            <div className="admin-orders">

              {filteredOrders.map(
                (order) => (

                  <article
                    className="admin-order-card"
                    key={order._id}
                  >

                    {/* ORDER TOP */}

                    <div className="admin-order-top">

                      <div>

                        <span className="admin-order-id">
                          ORDER #
                          {order._id
                            .slice(-6)
                            .toUpperCase()}
                        </span>

                        <h3>
                          {order.customer?.name ||
                            "Unknown customer"}
                        </h3>

                        <a
                          href={`tel:${
                            order.customer
                              ?.phone || ""
                          }`}
                          className="admin-phone"
                        >
                          {order.customer?.phone ||
                            "No phone number"}
                        </a>

                      </div>

                      <div className="admin-order-status">

                        <span
                          className={`admin-status-dot ${getStatusClass(
                            order.status
                          )}`}
                        />

                        <select
                          value={order.status}
                          disabled={
                            updatingOrder ===
                            order._id
                          }
                          onChange={(event) =>
                            updateOrderStatus(
                              order._id,
                              event.target.value
                            )
                          }
                          aria-label="Update order status"
                        >
                          {STATUS_OPTIONS.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>
                            )
                          )}
                        </select>

                      </div>

                    </div>

                    <div className="admin-order-divider" />

                    {/* ORDER INFORMATION */}

                    <div className="admin-order-info">

                      <div>
                        <span>
                          Service
                        </span>

                        <strong>
                          {order.service}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Date
                        </span>

                        <strong>
                          {formatDate(
                            order.createdAt
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Total
                        </span>

                        <strong>
                          ₦
                          {Number(
                            order.total || 0
                          ).toLocaleString()}
                        </strong>
                      </div>

                    </div>

                    {/* ORDER CONTACT ACTIONS */}

                    <div className="admin-order-contact-actions">

                      <a
                        href={`tel:${
                          order.customer?.phone || ""
                        }`}
                        className="admin-order-call"
                      >
                        Call Customer
                      </a>

                      <a
                        href={`https://wa.me/${getOrderWhatsAppNumber(
                          order.customer?.phone
                        )}?text=${encodeURIComponent(
                          buildOrderWhatsAppMessage(
                            order
                          )
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-order-whatsapp"
                      >
                        WhatsApp
                      </a>

                    </div>

                    <div className="admin-order-divider" />

                    {/* DELIVERY ADDRESS */}

                    {order.service ===
                      "Delivery" &&
                      order.address && (
                        <div className="admin-order-address">

                          <span>
                            Delivery address
                          </span>

                          <p>
                            {order.address}
                          </p>

                        </div>
                      )}

                    {/* ORDER ITEMS */}

                    <div className="admin-order-items">

                      <div className="admin-items-heading">

                        <span>
                          Order items
                        </span>

                      </div>

                      {order.items?.map(
                        (item, index) => (

                          <div
                            className="admin-order-item"
                            key={`${order._id}-${index}`}
                          >

                            <div className="admin-item-image">

                              {item.image ? (

                                <img
                                  src={item.image}
                                  alt={item.name}
                                />

                              ) : (

                                <span>
                                  🍛
                                </span>

                              )}

                            </div>

                            <div className="admin-item-details">

                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                ₦
                                {Number(
                                  item.price || 0
                                ).toLocaleString()}{" "}
                                × {item.quantity}
                              </span>

                            </div>

                            <strong className="admin-item-total">
                              ₦
                              {(
                                Number(
                                  item.price || 0
                                ) *
                                item.quantity
                              ).toLocaleString()}
                            </strong>

                          </div>

                        )
                      )}

                    </div>

                    {/* CUSTOMER NOTE */}

                    {order.note && (
                      <div className="admin-order-note">

                        <span>
                          Customer note
                        </span>

                        <p>
                          {order.note}
                        </p>

                      </div>
                    )}

                  </article>

                )
              )}

            </div>

          )}

        </section>

        {/* ========================================
            RESERVATIONS
        ======================================== */}

        <section className="admin-reservations-section">

          <div className="admin-section-header">

            <div>

              <span className="admin-section-eyebrow">
                RESERVATIONS
              </span>

              <h2>
                Table reservations
              </h2>

            </div>

            <span className="admin-order-count">
              {filteredReservations.length}{" "}
              {filteredReservations.length === 1
                ? "reservation"
                : "reservations"}
            </span>

          </div>

          {/* RESERVATION STATS */}

          <div className="admin-reservation-stats">

            <article className="admin-reservation-stat">
              <span>
                Total
              </span>

              <strong>
                {
                  reservationStats.totalReservations
                }
              </strong>
            </article>

            <article className="admin-reservation-stat">
              <span>
                Pending
              </span>

              <strong>
                {
                  reservationStats.pendingReservations
                }
              </strong>
            </article>

            <article className="admin-reservation-stat">
              <span>
                Confirmed
              </span>

              <strong>
                {
                  reservationStats.confirmedReservations
                }
              </strong>
            </article>

            <article className="admin-reservation-stat">
              <span>
                Cancelled
              </span>

              <strong>
                {
                  reservationStats.cancelledReservations
                }
              </strong>
            </article>

          </div>

          {/* RESERVATION SEARCH */}

          <div className="admin-order-filters">

            <div className="admin-search-wrapper">

              <span
                className="admin-search-icon"
                aria-hidden="true"
              >
                ⌕
              </span>

              <input
                type="search"
                placeholder="Search reservation by name or phone..."
                value={reservationSearchTerm}
                onChange={(event) =>
                  setReservationSearchTerm(
                    event.target.value
                  )
                }
                aria-label="Search reservations"
              />

              {reservationSearchTerm && (
                <button
                  type="button"
                  className="admin-search-clear"
                  onClick={() =>
                    setReservationSearchTerm("")
                  }
                  aria-label="Clear reservation search"
                >
                  ×
                </button>
              )}

            </div>

            <div
              className="admin-status-filters"
              role="group"
              aria-label="Filter reservations by status"
            >

              {[
                "All",
                ...RESERVATION_STATUS_OPTIONS,
              ].map((status) => (

                <button
                  key={status}
                  type="button"
                  className={
                    reservationStatusFilter ===
                    status
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setReservationStatusFilter(
                      status
                    )
                  }
                  aria-pressed={
                    reservationStatusFilter ===
                    status
                  }
                >
                  {status}
                </button>

              ))}

            </div>

          </div>

          {/* RESERVATION ERROR */}

          {reservationError && (

            <div className="admin-error">

              <span>!</span>

              <p>
                {reservationError}
              </p>

              <button
                type="button"
                onClick={fetchReservations}
              >
                Try again
              </button>

            </div>

          )}

          {/* RESERVATION LOADING */}

          {reservationsLoading ? (

            <div className="admin-empty">

              <div className="admin-spinner" />

              <p>
                Loading reservations...
              </p>

            </div>

          ) : filteredReservations.length === 0 ? (

            <div className="admin-empty">

              <div className="admin-empty-icon">
                📅
              </div>

              <h3>
                {reservations.length === 0
                  ? "No reservations yet"
                  : "No matching reservations"}
              </h3>

              <p>
                {reservations.length === 0
                  ? "Customer table reservations will appear here when they make a request."
                  : "Try a different search term or status filter."}
              </p>

              {reservations.length > 0 && (

                <button
                  type="button"
                  className="admin-clear-filters"
                  onClick={() => {
                    setReservationSearchTerm("");
                    setReservationStatusFilter(
                      "All"
                    );
                  }}
                >
                  Clear filters
                </button>

              )}

            </div>

          ) : (

            <div className="admin-reservations">

              {filteredReservations.map(
                (reservation) => (

                  <article
                    className="admin-reservation-card"
                    key={reservation._id}
                  >

                    {/* RESERVATION HEADER */}

                    <div className="admin-reservation-top">

                      <div>

                        <span className="admin-order-id">
                          RESERVATION #
                          {reservation._id
                            .slice(-6)
                            .toUpperCase()}
                        </span>

                        <h3>
                          {reservation.customer
                            ?.name ||
                            "Unknown customer"}
                        </h3>

                        <a
                          href={`tel:${
                            reservation.customer
                              ?.phone || ""
                          }`}
                          className="admin-phone"
                        >
                          {reservation.customer
                            ?.phone ||
                            "No phone number"}
                        </a>

                      </div>

                      <div className="admin-order-status">

                        <span
                          className={`admin-status-dot ${getStatusClass(
                            reservation.status
                          )}`}
                        />

                        <select
                          value={
                            reservation.status
                          }
                          disabled={
                            updatingReservation ===
                            reservation._id
                          }
                          onChange={(event) =>
                            updateReservationStatus(
                              reservation._id,
                              event.target.value
                            )
                          }
                          aria-label="Update reservation status"
                        >
                          {RESERVATION_STATUS_OPTIONS.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>
                            )
                          )}
                        </select>

                      </div>

                    </div>

                    <div className="admin-order-divider" />

                    {/* RESERVATION DETAILS */}

                    <div className="admin-reservation-details">

                      <div>
                        <span>
                          Reservation date
                        </span>

                        <strong>
                          {formatReservationDate(
                            reservation.date
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Preferred time
                        </span>

                        <strong>
                          {formatReservationTime(
                            reservation.time
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Guests
                        </span>

                        <strong>
                          {reservation.guests}
                          {reservation.guests ===
                          "1"
                            ? " guest"
                            : " guests"}
                        </strong>
                      </div>

                    </div>

                    {/* SPECIAL REQUEST */}

                    <div className="admin-reservation-request">

                      <span>
                        Special request
                      </span>

                      <p>
                        {reservation.request ||
                          "No special request."}
                      </p>

                    </div>

                    {/* SUBMITTED + CONTACT ACTIONS */}

                    <div className="admin-reservation-submitted">

                      <div className="admin-reservation-submitted-info">

                        <span>
                          Request submitted
                        </span>

                        <strong>
                          {formatDate(
                            reservation.createdAt
                          )}
                        </strong>

                      </div>

                      <div className="admin-reservation-actions">

                        {/* CALL */}

                        <a
                          href={`tel:${
                            reservation.customer
                              ?.phone || ""
                          }`}
                          className="admin-reservation-call"
                        >
                          Call
                        </a>

                        {/* WHATSAPP */}

                        <a
                          href={`https://wa.me/${getWhatsAppNumber(
                            reservation.customer
                              ?.phone
                          )}?text=${encodeURIComponent(
                            buildReservationWhatsAppMessage(
                              reservation
                            )
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-reservation-whatsapp"
                        >
                          WhatsApp
                        </a>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </section>

      </div>
    </main>
  );
}

export default AdminDashboard;