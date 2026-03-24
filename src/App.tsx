import './App.css';
import CurrentGallery from './components/Gallery/CurrentGallery';
import GrowthGallery from './components/Gallery/GrowthGallery';

const App = () => {
  return (
    <div>
      <header style={{
        textAlign: 'center',
        padding: '3rem 1.5rem 1rem',
        background: 'linear-gradient(135deg, #FAF6EF 0%, #F0E9DC 100%)',
        borderBottom: '1px solid #E8DDD0',
      }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4623A', marginBottom: '0.5rem' }}>
          Welcome to
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#2C1F16', margin: 0 }}>
          Meet The Jeons
        </h1>
        <p style={{ fontFamily: 'sans-serif', fontSize: '1.1rem', color: '#6B5645', marginTop: '0.75rem', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          A family album — two kids, a whole lot of love, and memories worth keeping.
        </p>
      </header>

      <main>
        <CurrentGallery />
        <GrowthGallery />
      </main>
    </div>
  );
};

export default App;
