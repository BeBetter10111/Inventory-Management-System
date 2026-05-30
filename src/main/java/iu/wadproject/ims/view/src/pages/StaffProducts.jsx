import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";

export default function Products({ userRole = "admin" }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingItemName, setDeletingItemName] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    stockQuantity: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [pds, cgs, sps] = await Promise.all([
          productService.getAllProducts(),
          categoryService.getAllCategories(),
        ]);

        setProducts(pds || []);
        setCategories(cgs || []);

        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAddModal = () => {
    setFormData({
      productName: "",
      category: "",
      price: "",
      stockQuantity: "",
      description: "",
    });

    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setFormData({
      productName: product.productName,
      category: product.category?.categoryId || "",
      price: product.price,
      stockQuantity: product.stockQuantity,
      description: product.description,
    });
    setEditingId(product.productId);
    setIsEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData({
      productName: "",
      category: "",
      price: "",
      stockQuantity: "",
      description: "",
    });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingId(null);
    setFormData({
      productName: "",
      category: "",
      price: "",
      stockQuantity: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    console.log(formData);

    if (formData.productName && formData.category && formData.price) {

      const isDuplicate = products.some(
            (p) =>
                p.productName.trim().toLowerCase() === formData.productName.trim().toLowerCase() &&
                p.category?.categoryId === formData.category
        );

        if (isDuplicate) {
            showNotification('error', `Product "${formData.productName}"`);
            return; 
        }
      try {
        const selectedCategory = await categoryService.getCategory(formData.category);

        const newProduct = await productService.createProduct(
          formData.productName,
          formData.description,
          formData.price,
          formData.stockQuantity,
          selectedCategory,
        );

        setProducts((prev) => [...prev, newProduct]);

        handleCloseAddModal();
        showNotification(
          "success",
          `Product "${formData.productName}" has been added`,
        );
      } catch (error) {
        showNotification("error", `Error adding product: ${error.message}`);
      }
    } else {
      showNotification("error", "Please fill in all required fields");
    }
  };

  const handleEditProduct = async () => {
    if (formData.productName && formData.category && formData.price) {
      const isDuplicate = products.some(
            (p) =>
                p.productId !== editingId &&
                p.productName.trim().toLowerCase() === formData.productName.trim().toLowerCase() &&
                p.category?.categoryId === formData.category
        );

        if (isDuplicate) {
            showNotification('error', `Tên sản phẩm "${formData.productName}" đã bị trùng trong danh mục này!`);
            return; 
        }
      try {
        const updatedProduct = await productService.updateProduct(
          editingId,
          formData.productName,
          formData.description,
          formData.price,
          formData.stockQuantity,
          formData.category,
        );

        setProducts((prev) =>
          prev.map((product) =>
            product.productId === editingId ? updatedProduct : product,
          ),
        );

        handleCloseEditModal();
        showNotification(
          "success",
          `Product "${formData.productName}" has been updated`,
        );
      } catch (error) {
        showNotification("error", `Error updating product: ${error.message}`);
      }
    } else {
      showNotification("error", "Please fill in all required fields");
    }
  };

  const handleOpenDeleteModal = (product) => {
    setDeletingId(product.productId);
    setDeletingItemName(product.productName);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingId(null);
    setDeletingItemName("");
  };

  const handleConfirmDelete = async () => {
    try {
      await productService.deleteProduct(deletingId);

      setProducts((prev) =>
        prev.filter((product) => product.productId !== deletingId),
      );

      handleCloseDeleteModal();
      showNotification(
        "success",
        `Product "${deletingItemName}" has been deleted`,
      );
    } catch (error) {
      showNotification("error", `Error deleting product: ${error.message}`);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCategory || product.category?.categoryId === selectedCategory),
  );

  const categoryOptions = () =>
    categories.map((cat) => {
      const catId = cat?.categoryId || cat?.id || cat;
      const catName = cat?.categoryName || cat?.name || cat;
      return (
        <option key={catId} value={catId}>
          {catName}
        </option>
      );
    });

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar userRole={userRole} />
        <main className="dashboard-main">
          <div className="loading">Loading products...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      {notification && (
        <div className={`notification-toast notification-${notification.type}`}>
          <span className="notification-icon">
            {notification.type === "success" ? "✓" : "✕"}
          </span>
          <span className="notification-message">{notification.message}</span>
        </div>
      )}

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">
              Home
            </a>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Product</span>
          </div>
          <div className="header-content">
            <h1>Product</h1>
            <p>Manage your Products</p>
          </div>
        </div>

        <div className="dashboard-container">
          <div className="table-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by code or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categoryOptions()}
              </select>
            </div>
            {userRole === "admin" && (
              <button className="btn-add" onClick={handleOpenAddModal}>
                Add Product
              </button>
            )}
          </div>

          <div className="table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Quantity</th>
                  <th>Description</th>
                  {userRole === "admin" && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const productId = product.productId || product.id;
                  const productCategory =
                    product.category?.categoryName || product.category || "";

                  return (
                    <tr key={productId}>
                      <td>{productId}</td>
                      <td>{product.productName}</td>
                      <td>{productCategory}</td>
                      <td>{product.price}</td>
                      <td>{product.stockQuantity}</td>
                      <td>{product.description}</td>
                      {userRole === "admin" && (
                        <td className="actions-cell">
                          <button
                            className="btn-edit"
                            onClick={() => handleOpenEditModal(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-more"
                            onClick={() => handleOpenDeleteModal(product)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="no-data">
                <p>No products found</p>
              </div>
            )}
            {filteredProducts.length > 0 && (
              <div className="table-footer">
                <p>
                  Showing 1-{filteredProducts.length} of{" "}
                  {filteredProducts.length} products
                </p>
                <div className="pagination">
                  <button className="btn-pagination" disabled>
                    Previous
                  </button>
                  <span className="page-number">1</span>
                  <button className="btn-pagination" disabled>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={handleCloseAddModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Product</h2>
                <button className="btn-close" onClick={handleCloseAddModal}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" id="category" onChange={handleInputChange}>
                      <option value="">Choose category</option>
                      {categoryOptions()}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      name="price"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      min = "1"
                      step = "1"
                      name="stockQuantity"
                      placeholder="Enter quantity"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseAddModal}>
                  Cancel
                </button>
                <button className="btn-submit" onClick={handleAddProduct}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay" onClick={handleCloseEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Product</h2>
                <button className="btn-close" onClick={handleCloseEditModal}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" id="category" onChange={handleInputChange}>
                      {categoryOptions()}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      min = "1"
                      step = "1"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseEditModal}>
                  Cancel
                </button>
                <button className="btn-submit" onClick={handleEditProduct}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Product Modal */}
        {isDeleteModalOpen && (
          <div className="modal-overlay" onClick={handleCloseDeleteModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Remove this product?</h2>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to remove product "{deletingItemName}"?
                  This action is irreversible!
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseDeleteModal}>
                  Cancel
                </button>
                <button className="btn-delete" onClick={handleConfirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
