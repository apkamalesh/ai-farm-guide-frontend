import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import statesWithCities from '../data/statesWithCities.json';
import categoriesWithProducts from '../data/categoriesWithProducts.json';
import './Market.css';

function Market() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '', state: '', city: '', category: '', product: '', phone: '', quantity: '', price: ''
  });

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('market_items');
      if (saved) return JSON.parse(saved);
    } catch {}
    return []; // Start with empty array
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('market_items', JSON.stringify(items));
    } catch {}
  }, [items]);

  // Validate all fields
  const canSubmit = useMemo(() => {
    const allFilled = Object.values(form).every(v => String(v).trim().length > 0);
    const phoneValid = /^[0-9]{10}$/.test(form.phone); // 10-digit numeric
    const quantityValid = !isNaN(form.quantity) && Number(form.quantity) > 0;
    const priceValid = !isNaN(form.price) && Number(form.price) > 0;
    return allFilled && phoneValid && quantityValid && priceValid;
  }, [form]);

  const onChange = (e) => {
    const { name, value } = e.target;

    // Only allow numeric input for phone, quantity, price
    if ((name === 'phone' || name === 'quantity' || name === 'price') && value && !/^\d*$/.test(value)) {
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { city: '' } : {}),
      ...(name === 'category' ? { product: '' } : {})
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setItems(prev => [
      { ...form, quantity: Number(form.quantity), price: Number(form.price) },
      ...prev
    ]);
    setForm({ name: '', state: '', city: '', category: '', product: '', phone: '', quantity: '', price: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const cityOptions = form.state ? statesWithCities[form.state] : [];
  const productOptions = form.category ? categoriesWithProducts[form.category] : [];

  return (
    <div className="market">
      <div className="market-container">
        <form className="card form" onSubmit={onSubmit}>
          <h3>🛒 {t('Add Product')}</h3>

          {showSuccess && (
            <div className="success-message">
              ✅ Product added successfully!
            </div>
          )}

          <div className="row">
            <label>{t('Farmer Name')}</label>
            <input name="name" value={form.name} onChange={onChange} placeholder={t('Farmer Name')} />
          </div>

          <div className="row">
            <label>{t('State')}</label>
            <select name="state" value={form.state} onChange={onChange}>
              <option value="">Select State</option>
              {Object.keys(statesWithCities).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <label>{t('City')}</label>
            <select name="city" value={form.city} onChange={onChange} disabled={!form.state}>
              <option value="">Select City</option>
              {cityOptions.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <label>{t('Category')}</label>
            <select name="category" value={form.category} onChange={onChange}>
              <option value="">Select Category</option>
              {Object.keys(categoriesWithProducts).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <label>{t('Product')}</label>
            <select name="product" value={form.product} onChange={onChange} disabled={!form.category}>
              <option value="">Select Product</option>
              {productOptions.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <label>{t('Farmer Phone')}</label>
            <input name="phone" value={form.phone} onChange={onChange} placeholder={t('Farmer Phone')} maxLength={10} />
          </div>

          <div className="row">
            <label>{t('Quantity (Kgs)')}</label>
            <input name="quantity" value={form.quantity} onChange={onChange} placeholder={t('Quantity (Kgs)')} />
          </div>

          <div className="row">
            <label>{t('Price (Per Kg)')}</label>
            <input name="price" value={form.price} onChange={onChange} placeholder={t('Price (Per Kg)')} />
          </div>

          <button className="primary" disabled={!canSubmit}>{t('Submit')}</button>
        </form>
      </div>
    </div>
  );
}

export default Market;
