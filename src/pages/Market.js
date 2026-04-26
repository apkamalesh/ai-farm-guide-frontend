import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import apiClient from '../apiClient'; 
import statesWithCities from '../data/statesWithCities.json';
import categoriesWithProducts from '../data/categoriesWithProducts.json';
import './Market.css';

function Market() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '', state: '', city: '', category: '', product: '', phone: '', quantity: '', price: ''
  });

  const [items, setItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load products from TiDB when the page opens
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/products');
        setItems(response.data);
      } catch (err) {
        console.error("Backend unreachable. Check if Render is 'Live'.");
      }
    };
    fetchData();
  }, []);

  const canSubmit = useMemo(() => {
    const allFilled = Object.values(form).every(v => String(v).trim().length > 0);
    const phoneValid = /^[0-9]{10}$/.test(form.phone);
    return allFilled && phoneValid;
  }, [form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    // Numeric filter for specific fields
    if (['phone', 'quantity', 'price'].includes(name) && value && !/^\d*$/.test(value)) return;

    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { city: '' } : {}),
      ...(name === 'category' ? { product: '' } : {})
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);

    try {
      // Send to TiDB via Render
      const response = await apiClient.post('/products', {
        farmerName: form.name,
        state: form.state,
        city: form.city,
        category: form.category,
        productName: form.product,
        farmerPhone: form.phone,
        quantity: Number(form.quantity),
        price: Number(form.price)
      });

      setItems(prev => [response.data, ...prev]);
      setForm({ name: '', state: '', city: '', category: '', product: '', phone: '', quantity: '', price: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Error: Database connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const cityOptions = form.state ? statesWithCities[form.state] : [];
  const productOptions = form.category ? categoriesWithProducts[form.category] : [];

  return (
    <div className="market">
      <div className="market-container">
        <form className="card form" onSubmit={onSubmit}>
          <h3>🛒 {t('Add Product')}</h3>
          {showSuccess && <div className="success-message">✅ Saved to TiDB Cloud!</div>}

          <div className="row">
            <label>{t('Farmer Name')}</label>
            <input name="name" value={form.name} onChange={onChange} />
          </div>

          <div className="row">
            <label>{t('State')}</label>
            <select name="state" value={form.state} onChange={onChange}>
              <option value="">Select State</option>
              {Object.keys(statesWithCities).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="row">
            <label>{t('City')}</label>
            <select name="city" value={form.city} onChange={onChange} disabled={!form.state}>
              <option value="">Select City</option>
              {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="row">
            <label>{t('Category')}</label>
            <select name="category" value={form.category} onChange={onChange}>
              <option value="">Select Category</option>
              {Object.keys(categoriesWithProducts).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="row">
            <label>{t('Product')}</label>
            <select name="product" value={form.product} onChange={onChange} disabled={!form.category}>
              <option value="">Select Product</option>
              {productOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="row">
            <label>{t('Farmer Phone')}</label>
            <input name="phone" value={form.phone} onChange={onChange} maxLength={10} />
          </div>

          <div className="row">
            <label>{t('Quantity (Kgs)')}</label>
            <input name="quantity" value={form.quantity} onChange={onChange} />
          </div>

          <div className="row">
            <label>{t('Price (Per Kg)')}</label>
            <input name="price" value={form.price} onChange={onChange} />
          </div>

          <button className="primary" disabled={!canSubmit || loading}>
            {loading ? "Saving..." : t('Submit')}
          </button>
        </form>

        <div className="market-list">
          {items.map((item, idx) => (
            <div key={item.id || idx} className="card item">
              <h4>{item.productName}</h4>
              <p>{item.city}, {item.state} | ₹{item.price}/kg</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Market;