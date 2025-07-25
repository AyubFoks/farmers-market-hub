import React, { useEffect, useState } from 'react';

function SeasonalPlanner() {
  const [region, setRegion] = useState('');
  const [seasonalTips, setSeasonalTips] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        const location = data.address.state || data.address.county;
        setRegion(location);
        loadTips(location);
      },
      () => {
        setRegion('Unknown');
        loadTips('default');
      }
    );
  }, []);

  const loadTips = (location) => {
    const tipsData = {
      'Kampala': ['Best time for tomatoes', 'Avoid maize during wet season'],
      'Nairobi': ['Plant beans in March', 'Harvest kale by June'],
      'default': ['Prepare soil early', 'Avoid overwatering']
    };
    setSeasonalTips(tipsData[location] || tipsData['default']);
  };

  return (
    <div>
      <h3>Seasonal Planner for {region}</h3>
      <ul>
        {seasonalTips.map((tip, index) => (
          <li key={index}>🌱 {tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default SeasonalPlanner;