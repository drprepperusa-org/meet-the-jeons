import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './pages/About/About';
import './App.css';

const Home = () => (
  <div className="home-placeholder">
    <div className="home-logo">🏡</div>
    <h1>Meet The Jeons</h1>
    <p>A family of four exploring the world, making memories, and sharing the journey — one adventure at a time.</p>
    <Link to="/about" className="home-cta">Meet The Family →</Link>
  </div>
);

const Gallery = () => (
  <div className="home-placeholder">
    <div className="home-logo">📸</div>
    <h1>Gallery</h1>
    <p>Our photo gallery — coming soon.</p>
    <Link to="/about" className="home-cta">← Back to About</Link>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
