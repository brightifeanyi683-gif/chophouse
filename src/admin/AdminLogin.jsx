import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Invalid email or password"
        );
      }

      localStorage.setItem(
        "chophouse_admin_token",
        result.token
      );

      localStorage.setItem(
        "chophouse_admin",
        JSON.stringify(result.admin)
      );

      navigate("/admin");
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-login">
      <div className="admin-login-shell">
        <div className="admin-login-brand">
          <a href="/" className="admin-login-logo">
            CHOP<span>HOUSE</span>
          </a>

          <span className="admin-login-tagline">
            THE TASTE OF NIGERIA
          </span>
        </div>

        <section className="admin-login-card">
          <div className="admin-login-heading">
            <span className="admin-login-eyebrow">
              PRIVATE AREA
            </span>

            <h1>Welcome back</h1>

            <p>
              Sign in to manage CHOPHOUSE orders and
              restaurant operations.
            </p>
          </div>

          {error && (
            <div className="admin-login-error">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >
            <div className="admin-login-field">
              <label htmlFor="admin-email">
                Email address
              </label>

              <input
                id="admin-email"
                name="email"
                type="email"
                placeholder="Enter your admin email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>

            <div className="admin-login-field">
              <div className="admin-password-label">
                <label htmlFor="admin-password">
                  Password
                </label>
              </div>

              <div className="admin-password-wrapper">
                <input
                  id="admin-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-login-submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Signing in..."
                : "Sign in to dashboard"}

              {!isLoading && <span>→</span>}
            </button>
          </form>

          <div className="admin-login-footer">
            <a href="/">
              ← Back to CHOPHOUSE website
            </a>
          </div>
        </section>

        <p className="admin-login-copyright">
          CHOPHOUSE Admin · The Taste of Nigeria
        </p>
      </div>
    </main>
  );
}

export default AdminLogin;