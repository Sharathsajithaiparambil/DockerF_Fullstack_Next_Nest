'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/home.module.css';

const API_URL = 'http://localhost:3001/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Unable to load products. Check that backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      setError('Please enter a product name and price.');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/products/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/products`, formData);
      }

      setFormData({ name: '', price: '', description: '' });
      await fetchProducts();
      setError('');
    } catch (err) {
      setError('Unable to save product.');
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || '',
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product permanently?')) return;

    try {
      await axios.delete(`${API_URL}/products/${id}`);
      await fetchProducts();
      setError('');
    } catch (err) {
      setError('Unable to delete product.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', description: '' });
    setError('');
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div>
          <p className={styles.badge}>Next.js + NestJS + MySQL</p>
          <h1 className={styles.title}>Build and manage your products</h1>
          <p className={styles.lead}>
            A clean CRUD experience with server API powered by NestJS and MySQL.
            Add, update, delete, and review products instantly.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span>Total products</span>
            <strong>{products.length}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Backend status</span>
            <strong>{loading ? 'Loading...' : 'Ready'}</strong>
          </div>
        </div>
      </section>

      <section className={styles.contentGrid}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2>{editingId ? 'Edit product' : 'Add new product'}</h2>
            <p>Save product details and refresh the list instantly.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Product name
              <input
                type="text"
                name="name"
                placeholder="Example: Running shoes"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Price
              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                placeholder="Optional description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
              />
            </label>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitBtn}>
                {editingId ? 'Update product' : 'Add product'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.productsSection}>
          <div className={styles.sectionHeader}>
            <h2>Products</h2>
            <p>View all items stored in the database.</p>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading products...</div>
          ) : products.length === 0 ? (
            <div className={styles.emptyState}>No products yet. Add one to get started.</div>
          ) : (
            <div className={styles.grid}>
              {products.map((product) => (
                <article key={product.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3>{product.name}</h3>
                    <span className={styles.price}>${parseFloat(product.price).toFixed(2)}</span>
                  </div>
                  <p className={styles.description}>
                    {product.description || 'No description provided.'}
                  </p>
                  <div className={styles.cardFooter}>
                    <button onClick={() => handleEdit(product)} className={styles.editBtn}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className={styles.deleteBtn}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
