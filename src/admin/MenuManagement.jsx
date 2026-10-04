import { useEffect, useMemo, useState } from "react";
import "./MenuManagement.css";

const API_URL = "http://localhost:5000/api";

const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const CATEGORIES = [
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

const EMPTY_FORM = {
  name: "",
  category: "Rice",
  description: "",
  price: "",
  image: "",
  featured: false,
  available: true,
};

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [deletingItem, setDeletingItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  const getToken = () => {
    return localStorage.getItem("chophouse_admin_token");
  };

  const handleUnauthorized = () => {
    localStorage.removeItem("chophouse_admin_token");
    localStorage.removeItem("chophouse_admin");

    window.location.href = "/admin/login";
  };

  // ========================================
  // FETCH MENU
  // ========================================

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/menu`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to load menu"
        );
      }

      setMenuItems(result.data || []);
    } catch (error) {
      console.error("Menu fetch error:", error);

      setError(
        "We couldn't load the menu. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // ========================================
  // FILTER MENU
  // ========================================

  const filteredItems = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return menuItems.filter((item) => {
      const matchesSearch =
        !search ||
        item.name?.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchTerm, categoryFilter]);

  // ========================================
  // STATS
  // ========================================

  const stats = useMemo(() => {
    return {
      total: menuItems.length,
      available: menuItems.filter(
        (item) => item.available
      ).length,
      unavailable: menuItems.filter(
        (item) => !item.available
      ).length,
      featured: menuItems.filter(
        (item) => item.featured
      ).length,
    };
  }, [menuItems]);

  // ========================================
  // ADD NEW DISH
  // ========================================

  const openAddModal = () => {
    setEditingItem({ _id: null });

    setFormData({
      ...EMPTY_FORM,
    });

    setImageUploadError("");
    setError("");
  };

  // ========================================
  // EDIT DISH
  // ========================================

  const openEditModal = (item) => {
    setEditingItem(item);

    setFormData({
      name: item.name || "",
      category: item.category || "Rice",
      description: item.description || "",
      price: item.price ?? "",
      image: item.image || "",
      featured: Boolean(item.featured),
      available: Boolean(item.available),
    });

    setImageUploadError("");
    setError("");
  };

  const closeEditModal = () => {
    if (saving || uploadingImage) return;

    setEditingItem(null);
    setFormData(EMPTY_FORM);
    setImageUploadError("");
  };

  // ========================================
  // FORM CHANGE
  // ========================================

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ========================================
  // CLOUDINARY IMAGE UPLOAD
  // ========================================

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageUploadError("");
    setError("");

    // Basic validation
    if (!file.type.startsWith("image/")) {
      setImageUploadError(
        "Please select a valid image file."
      );

      event.target.value = "";
      return;
    }

    // 5MB limit
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setImageUploadError(
        "Image is too large. Please choose an image under 5MB."
      );

      event.target.value = "";
      return;
    }

    if (
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_UPLOAD_PRESET
    ) {
      setImageUploadError(
        "Cloudinary is not configured correctly. Please check your .env file."
      );

      event.target.value = "";
      return;
    }

    try {
      setUploadingImage(true);

      const uploadData = new FormData();

      uploadData.append("file", file);
      uploadData.append(
        "upload_preset",
        CLOUDINARY_UPLOAD_PRESET
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.secure_url) {
        throw new Error(
          result.error?.message ||
            "Image upload failed."
        );
      }

      setFormData((current) => ({
        ...current,
        image: result.secure_url,
      }));
    } catch (error) {
      console.error(
        "Cloudinary upload error:",
        error
      );

      setImageUploadError(
        error.message ||
          "Unable to upload image. Please try again."
      );
    } finally {
      setUploadingImage(false);

      // Allow selecting the same file again
      event.target.value = "";
    }
  };

  // ========================================
  // REMOVE IMAGE
  // ========================================

  const handleRemoveImage = () => {
    if (saving || uploadingImage) return;

    setFormData((current) => ({
      ...current,
      image: "",
    }));

    setImageUploadError("");
  };

  // ========================================
  // CREATE / UPDATE DISH
  // ========================================

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!editingItem) return;

    if (!formData.image.trim()) {
      setError("Please upload an image for this dish.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const token = getToken();

      if (!token) {
        handleUnauthorized();
        return;
      }

      const isCreating = !editingItem._id;

      const response = await fetch(
        isCreating
          ? `${API_URL}/menu`
          : `${API_URL}/menu/${editingItem._id}`,
        {
          method: isCreating ? "POST" : "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            category: formData.category,
            description:
              formData.description.trim(),
            price: Number(formData.price),
            image: formData.image.trim(),
            featured: formData.featured,
            available: formData.available,
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
            `Failed to ${
              isCreating ? "create" : "update"
            } menu item`
        );
      }

      if (isCreating) {
        setMenuItems((currentItems) => [
          result.data,
          ...currentItems,
        ]);
      } else {
        setMenuItems((currentItems) =>
          currentItems.map((item) =>
            item._id === editingItem._id
              ? result.data
              : item
          )
        );
      }

      closeEditModal();
    } catch (error) {
      console.error("Menu save error:", error);

      setError(
        error.message ||
          "Unable to save this menu item."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // QUICK AVAILABILITY TOGGLE
  // ========================================

  const toggleAvailability = async (item) => {
    try {
      setError("");

      const token = getToken();

      if (!token) {
        handleUnauthorized();
        return;
      }

      const response = await fetch(
        `${API_URL}/menu/${item._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: item.name,
            category: item.category,
            description: item.description,
            price: Number(item.price),
            image: item.image,
            featured: Boolean(item.featured),
            available: !item.available,
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
            "Failed to update availability"
        );
      }

      setMenuItems((currentItems) =>
        currentItems.map((currentItem) =>
          currentItem._id === item._id
            ? result.data
            : currentItem
        )
      );
    } catch (error) {
      console.error(
        "Availability update error:",
        error
      );

      setError(
        error.message ||
          "Unable to update dish availability."
      );
    }
  };

  // ========================================
  // DELETE DISH
  // ========================================

  const openDeleteModal = (item) => {
    setDeletingItem(item);
    setError("");
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setDeletingItem(null);
  };

  const handleDelete = async () => {
    if (!deletingItem) return;

    try {
      setDeleting(true);
      setError("");

      const token = getToken();

      if (!token) {
        handleUnauthorized();
        return;
      }

      const response = await fetch(
        `${API_URL}/menu/${deletingItem._id}`,
        {
          method: "DELETE",

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
            "Failed to delete menu item"
        );
      }

      setMenuItems((currentItems) =>
        currentItems.filter(
          (item) =>
            item._id !== deletingItem._id
        )
      );

      setDeletingItem(null);
    } catch (error) {
      console.error(
        "Menu delete error:",
        error
      );

      setError(
        error.message ||
          "Unable to delete this menu item."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <main className="menu-management">
      <div className="menu-management-container">

        {/* ========================================
            HEADER
        ======================================== */}

        <header className="menu-management-header">
          <div>
            <span className="admin-eyebrow">
              CHOPHOUSE ADMIN
            </span>

            <h1>Menu Management</h1>

            <p>
              Manage your dishes, prices,
              availability and featured items.
            </p>
          </div>

          <div className="menu-header-actions">
            <button
              type="button"
              className="menu-add-button"
              onClick={openAddModal}
            >
              + Add new dish
            </button>

            <button
              type="button"
              className="menu-refresh"
              onClick={fetchMenu}
              disabled={loading}
            >
              ↻{" "}
              {loading
                ? "Refreshing..."
                : "Refresh menu"}
            </button>
          </div>
        </header>

        {/* ========================================
            ERROR
        ======================================== */}

        {error && (
          <div className="menu-management-error">
            <span>!</span>

            <p>{error}</p>

            <button
              type="button"
              onClick={fetchMenu}
            >
              Try again
            </button>
          </div>
        )}

        {/* ========================================
            STATS
        ======================================== */}

        <section className="menu-management-stats">
          <article className="menu-stat-card">
            <span>Total dishes</span>
            <strong>{stats.total}</strong>
            <small>All menu items</small>
          </article>

          <article className="menu-stat-card">
            <span>Available</span>
            <strong>{stats.available}</strong>
            <small>Currently available</small>
          </article>

          <article className="menu-stat-card">
            <span>Unavailable</span>
            <strong>{stats.unavailable}</strong>
            <small>Hidden from customers</small>
          </article>

          <article className="menu-stat-card">
            <span>Featured</span>
            <strong>{stats.featured}</strong>
            <small>Featured dishes</small>
          </article>
        </section>

        {/* ========================================
            MENU
        ======================================== */}

        <section className="menu-management-section">
          <div className="menu-section-heading">
            <div>
              <span className="admin-section-eyebrow">
                MENU
              </span>

              <h2>Restaurant dishes</h2>
            </div>

            <span className="menu-result-count">
              {filteredItems.length}{" "}
              {filteredItems.length === 1
                ? "dish"
                : "dishes"}
            </span>
          </div>

          {/* FILTERS */}

          <div className="menu-management-filters">
            <div className="menu-search">
              <span>⌕</span>

              <input
                type="search"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="menu-category-filters">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    categoryFilter === category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCategoryFilter(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* MENU GRID */}

          {loading ? (
            <div className="menu-management-empty">
              <div className="menu-spinner" />
              <p>Loading menu...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="menu-management-empty">
              <div className="menu-empty-icon">
                🍽️
              </div>

              <h3>No dishes found</h3>

              <p>
                Try another search term or category.
              </p>
            </div>
          ) : (
            <div className="menu-grid">
              {filteredItems.map((item) => (
                <article
                  className="menu-admin-card"
                  key={item._id}
                >
                  <div className="menu-admin-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />

                    <button
                      type="button"
                      className={
                        item.available
                          ? "menu-availability available"
                          : "menu-availability unavailable"
                      }
                      onClick={() =>
                        toggleAvailability(item)
                      }
                      title={
                        item.available
                          ? "Click to mark unavailable"
                          : "Click to mark available"
                      }
                      aria-label={
                        item.available
                          ? `Mark ${item.name} unavailable`
                          : `Mark ${item.name} available`
                      }
                    >
                      {item.available
                        ? "Available"
                        : "Unavailable"}
                    </button>
                  </div>

                  <div className="menu-admin-content">
                    <div className="menu-admin-topline">
                      <span>
                        {item.category}
                      </span>

                      {item.featured && (
                        <span className="menu-featured">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3>{item.name}</h3>

                    <p>
                      {item.description}
                    </p>

                    <div className="menu-admin-bottom">
                      <strong>
                        ₦
                        {Number(
                          item.price
                        ).toLocaleString()}
                      </strong>

                      <div className="menu-card-actions">
                        <button
                          type="button"
                          className="menu-edit-button"
                          onClick={() =>
                            openEditModal(item)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="menu-delete-button"
                          onClick={() =>
                            openDeleteModal(item)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* ========================================
          ADD / EDIT MODAL
      ======================================== */}

      {editingItem && (
        <div
          className="menu-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeEditModal();
            }
          }}
        >
          <div className="menu-edit-modal">
            <div className="menu-modal-header">
              <div>
                <span className="admin-section-eyebrow">
                  {editingItem?._id
                    ? "EDIT DISH"
                    : "NEW DISH"}
                </span>

                <h2>
                  {editingItem?._id
                    ? "Edit menu item"
                    : "Add new dish"}
                </h2>

                <p>
                  {editingItem?._id
                    ? "Update the information for this dish."
                    : "Add a new dish to the restaurant menu."}
                </p>
              </div>

              <button
                type="button"
                className="menu-modal-close"
                onClick={closeEditModal}
                disabled={
                  saving || uploadingImage
                }
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <form
              className="menu-edit-form"
              onSubmit={handleUpdate}
            >
              <div className="menu-form-grid">
                <label>
                  <span>Food name</span>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Jollof Rice"
                    required
                  />
                </label>

                <label>
                  <span>Category</span>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                  >
                    {CATEGORIES.filter(
                      (category) =>
                        category !== "All"
                    ).map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                <span>Description</span>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Describe the dish..."
                  rows="4"
                  required
                />
              </label>

              <div className="menu-form-grid">
                <label>
                  <span>Price (₦)</span>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="2500"
                    min="0"
                    required
                  />
                </label>

                {/* IMAGE UPLOAD */}

                <div className="menu-upload-field">
                  <span>Dish image</span>

                  <label
                    className={
                      uploadingImage
                        ? "menu-upload-box uploading"
                        : "menu-upload-box"
                    }
                  >
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/jpg"
                      onChange={handleImageUpload}
                      disabled={
                        saving ||
                        uploadingImage
                      }
                    />

                    <div className="menu-upload-icon">
                      {uploadingImage
                        ? "↻"
                        : "↑"}
                    </div>

                    <strong>
                      {uploadingImage
                        ? "Uploading image..."
                        : formData.image
                          ? "Choose another image"
                          : "Upload food image"}
                    </strong>

                    <small>
                      JPG, PNG or WebP · Max 5MB
                    </small>
                  </label>

                  {imageUploadError && (
                    <p className="menu-upload-error">
                      {imageUploadError}
                    </p>
                  )}
                </div>
              </div>

              {/* IMAGE PREVIEW */}

              {formData.image && (
                <div className="menu-image-preview">
                  <div className="menu-image-preview-header">
                    <span>
                      Image preview
                    </span>

                    <button
                      type="button"
                      onClick={
                        handleRemoveImage
                      }
                      disabled={
                        saving ||
                        uploadingImage
                      }
                    >
                      Remove
                    </button>
                  </div>

                  <div className="menu-image-preview-box">
                    <img
                      src={formData.image}
                      alt="Dish preview"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="menu-form-options">
                <label className="menu-checkbox">
                  <input
                    type="checkbox"
                    name="available"
                    checked={
                      formData.available
                    }
                    onChange={handleFormChange}
                  />

                  <span>
                    <strong>
                      Available
                    </strong>

                    <small>
                      Customers can order this
                      dish.
                    </small>
                  </span>
                </label>

                <label className="menu-checkbox">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={
                      formData.featured
                    }
                    onChange={handleFormChange}
                  />

                  <span>
                    <strong>
                      Featured
                    </strong>

                    <small>
                      Show this dish as a
                      featured item.
                    </small>
                  </span>
                </label>
              </div>

              <div className="menu-modal-actions">
                <button
                  type="button"
                  className="menu-cancel-button"
                  onClick={closeEditModal}
                  disabled={
                    saving ||
                    uploadingImage
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="menu-save-button"
                  disabled={
                    saving ||
                    uploadingImage ||
                    !formData.image
                  }
                >
                  {saving
                    ? "Saving..."
                    : uploadingImage
                      ? "Uploading..."
                      : editingItem?._id
                        ? "Save changes"
                        : "Add dish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================
          DELETE CONFIRMATION MODAL
      ======================================== */}

      {deletingItem && (
        <div
          className="menu-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeDeleteModal();
            }
          }}
        >
          <div className="menu-delete-modal">
            <div className="menu-delete-icon">
              !
            </div>

            <span className="admin-section-eyebrow">
              DELETE DISH
            </span>

            <h2>
              Delete "{deletingItem.name}"?
            </h2>

            <p>
              This action will permanently remove
              this dish from the CHOPHOUSE menu.
              This cannot be undone.
            </p>

            <div className="menu-delete-actions">
              <button
                type="button"
                className="menu-cancel-button"
                onClick={closeDeleteModal}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="menu-confirm-delete-button"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting
                  ? "Deleting..."
                  : "Yes, delete dish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MenuManagement;