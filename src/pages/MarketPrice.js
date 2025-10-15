import React, { useEffect, useState } from 'react';
import './MarketPrice.css';

function MarketPrice() {
  const [trending, setTrending] = useState({
    vegetables: [],
    fruits: [],
    flowers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Mock API data (Replace this with your real API call)
  const mockAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          vegetables: [
            { name: 'Tomato', price: 24, changePct: 8 },
            { name: 'Onion', price: 32, changePct: 5 },
            { name: 'Potato', price: 30, changePct: -2 },
          ],
          fruits: [
            { name: 'Banana', price: 60, changePct: 4 },
            { name: 'Apple', price: 180, changePct: -3 },
            { name: 'Guava', price: 80, changePct: 6 },
          ],
          flowers: [
            { name: 'Jasmine', price: 400, changePct: 12 },
            { name: 'Rose', price: 150, changePct: -4 },
            { name: 'Marigold', price: 120, changePct: 3 },
          ],
        });
      }, 1000);
    });
  };

  useEffect(() => {
    async function fetchTrending() {
      try {
        // Replace `mockAPI()` with real API fetch later
        const data = await mockAPI();
        setTrending(data);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  if (loading) return <div className="loading">Loading market prices...</div>;
  if (error) return <div className="error">{error}</div>;

  const renderCategory = (title, emoji, items) => (
    <div className="trend-section">
      <h3>{emoji} {title}</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx} className="trend-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">₹ {item.price}</span>
            <span className={`item-change ${item.changePct >= 0 ? 'up' : 'down'}`}>
              {item.changePct >= 0 ? '↑' : '↓'} {Math.abs(item.changePct)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="market-price">
      <h2 className="title">📈 Top Trending Market Prices</h2>
      <div className="trend-cards">
        {renderCategory('Vegetables', '🥦', trending.vegetables)}
        {renderCategory('Fruits', '🍎', trending.fruits)}
        {renderCategory('Flowers', '🌸', trending.flowers)}
      </div>
    </div>
  );
}

export default MarketPrice;
