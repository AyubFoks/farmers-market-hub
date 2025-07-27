import React, { useEffect, useState } from 'react';

const tipsData = {
  'Kampala': [
    { tip: 'Best time for tomatoes', icon: '🍅' },
    { tip: 'Avoid maize during wet season', icon: '🌽' }
  ],
  'Nairobi': [
    { tip: 'Plant beans in March', icon: '🌱' },
    { tip: 'Harvest kale by June', icon: '🥬' }
  ],
  'default': [
    { tip: 'Prepare soil early', icon: '🪱' },
    { tip: 'Avoid overwatering', icon: '💧' }
  ]
};

const regions = ['Kampala', 'Nairobi'];

function SeasonalPlanner() {
  const [region, setRegion] = useState('');
  const [seasonalTips, setSeasonalTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        const location = data.address.state || data.address.county || 'default';
        setRegion(location);
        setSeasonalTips(tipsData[location] || tipsData['default']);
        setLoading(false);
      },
      () => {
        setRegion('');
        setSeasonalTips(tipsData['default']);
        setLoading(false);
      }
    );
  }, []);

  const handleRegionChange = (e) => {
    const loc = e.target.value;
    setRegion(loc);
    setSeasonalTips(tipsData[loc] || tipsData['default']);
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: "40px auto",
      background: "#f6fff4",
      borderRadius: 16,
      boxShadow: "0 4px 16px #7ed95733",
      padding: 32,
      textAlign: "center"
    }}>
      <h2 style={{ color: "#009f52" }}>🌾 Seasonal Crop Planner</h2>
      <p style={{ fontStyle: "italic", color: "#555" }}>
        {region ? `Tailored tips for ${region}` : "Select your region for tailored tips!"}
      </p>
      {loading ? (
        <div style={{ margin: "30px 0" }}>
          <span role="img" aria-label="loading" style={{ fontSize: 32 }}>⏳</span>
          <p>Detecting your location...</p>
        </div>
      ) : (
        <>
          {!region && (
            <div style={{ margin: "20px 0" }}>
              <label htmlFor="region-select" style={{ marginRight: 8 }}>Choose your region:</label>
              <select id="region-select" onChange={handleRegionChange} defaultValue="">
                <option value="" disabled>Select region</option>
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          )}
          <div style={{ margin: "20px 0" }}>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              alt="Seasonal"
              style={{ width: "100%", borderRadius: 12, marginBottom: 16 }}
            />
            <ul style={{ listStyle: "none", padding: 0 }}>
              {seasonalTips.map((item, index) => (
                <li key={index} style={{
                  background: "#fff",
                  margin: "10px 0",
                  borderRadius: 8,
                  padding: "12px 16px",
                  boxShadow: "0 2px 6px #7ed95722",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.1rem"
                }}>
                  <span style={{ fontSize: 24, marginRight: 12 }}>{item.icon}</span>
                  <span>{item.tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <blockquote style={{
            color: "#009f52",
            fontWeight: "bold",
            marginTop: 24,
            fontSize: "1.1rem"
          }}>
            "The best time to plant a tree was 20 years ago. The second best time is now."
          </blockquote>
        </>
      )}
    </div>
  );
}

export default SeasonalPlanner;