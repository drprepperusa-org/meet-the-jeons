import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CurrentGallery from './components/Gallery/CurrentGallery';
import GrowthGallery from './components/Gallery/GrowthGallery';
import './App.css';

const Home = () => (
  <div className="home-placeholder">
    <div className="home-logo">🏡</div>
    <h1>Meet The Jeons</h1>
    <p>A family of four exploring the world, making memories, and sharing the journey — one adventure at a time.</p>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Link to="/gallery/current" className="home-cta">📸 Current Gallery</Link>
      <Link to="/gallery/growth" className="home-cta" style={{ background: '#7A8C6E' }}>🌱 Watch Them Grow</Link>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery/current" element={<CurrentGallery />} />
        <Route path="/gallery/growth" element={<GrowthGallery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
