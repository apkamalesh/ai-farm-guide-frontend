import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import statesWithCities from '../data/statesWithCities.json';
import './Rates.css';

function Rates() {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    state: '',
    city: '',
    search: '',
    minPrice: 0,
    maxPrice: 10000,
    minQuantity: 0,
    maxQuantity: 1000,
    sort: ''
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('market_items');
      if (saved) setProducts(JSON.parse(saved));
    } catch {}
  }, []);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      state: '',
      city: '',
      search: '',
      minPrice: 0,
      maxPrice: 10000,
      minQuantity: 0,
      maxQuantity: 1000,
      sort: ''
    });
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const price = Number(p.price) || 0;
      const quantity = Number(p.quantity) || 0;
      return (
        (filters.category ? p.category === filters.category : true) &&
        (filters.state ? p.state === filters.state : true) &&
        (filters.city ? p.city === filters.city : true) &&
        (filters.search ? p.product.toLowerCase().includes(filters.search.toLowerCase()) : true) &&
        price >= Number(filters.minPrice) &&
        price <= Number(filters.maxPrice) &&
        quantity >= Number(filters.minQuantity) &&
        quantity <= Number(filters.maxQuantity)
      );
    });

    if (filters.sort === 'priceAsc') filtered.sort((a, b) => a.price - b.price);
    if (filters.sort === 'priceDesc') filtered.sort((a, b) => b.price - a.price);
    if (filters.sort === 'quantityAsc') filtered.sort((a, b) => a.quantity - b.quantity);
    if (filters.sort === 'quantityDesc') filtered.sort((a, b) => b.quantity - a.quantity);

    return filtered;
  }, [products, filters]);

  return (
    <div className="rates">
      <h2 className="title">{t('Market Products')}</h2>

      {/* Filters Panel */}
      <div className="filters-panel">
        <input type="text" name="search" placeholder={t('Search Product')} value={filters.search} onChange={handleFilterChange} className="filter-input" />

        <select name="category" value={filters.category} onChange={handleFilterChange} className="filter-select">
          <option value="">{t('All Categories')}</option>
          <option value="Vegetables">{t('Vegetables')}</option>
          <option value="Fruits">{t('Fruits')}</option>
          <option value="Flowers">{t('Flowers')}</option>
        </select>

        <select name="state" value={filters.state} onChange={handleFilterChange} className="filter-select">
          <option value="">{t('All States')}</option>
          {Object.keys(statesWithCities).map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select name="city" value={filters.city} onChange={handleFilterChange} className="filter-select" disabled={!filters.state}>
          <option value="">{t('All Cities')}</option>
          {filters.state && statesWithCities[filters.state].map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="range-group">
          <label>{t('Price')}: {filters.minPrice} - {filters.maxPrice}</label>
          <input type="range" name="minPrice" min="0" max="10000" value={filters.minPrice} onChange={handleFilterChange} />
          <input type="range" name="maxPrice" min="0" max="10000" value={filters.maxPrice} onChange={handleFilterChange} />
        </div>

        <div className="range-group">
          <label>{t('Quantity')}: {filters.minQuantity} - {filters.maxQuantity}</label>
          <input type="range" name="minQuantity" min="0" max="1000" value={filters.minQuantity} onChange={handleFilterChange} />
          <input type="range" name="maxQuantity" min="0" max="1000" value={filters.maxQuantity} onChange={handleFilterChange} />
        </div>

        <select name="sort" value={filters.sort} onChange={handleFilterChange} className="filter-select">
          <option value="">{t('Sort By')}</option>
          <option value="priceAsc">{t('Price Ascending')}</option>
          <option value="priceDesc">{t('Price Descending')}</option>
          <option value="quantityAsc">{t('Quantity Ascending')}</option>
          <option value="quantityDesc">{t('Quantity Descending')}</option>
        </select>

        <button onClick={resetFilters} className="filter-reset">{t('Clear Filters')}</button>
      </div>

      {/* Products List */}
      <div className="products-list-section">
        {filteredProducts.length === 0 ? (
          <div className="empty">{t('No Products Found')}</div>
        ) : (
          <ul className="products-list">
            {filteredProducts.map((p, idx) => (
              <li key={idx} className="product-item">
                <div className="product-title">{p.product} — <strong>₹{p.price}</strong></div>
                <div className="product-meta">
                  <span>{t('Name')}: {p.name}</span>
                  <span>{t('State')}: {p.state}</span>
                  <span>{t('City')}: {p.city}</span>
                  <span>{t('Category')}: {p.category}</span>
                  <span>{t('Quantity')}: {p.quantity}</span>
                  <span>{t('Phone')}: {p.phone}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Rates;
