import React from 'react';
import Hero from '../components/Hero/Hero';

const Home: React.FC = () => (
  <>
    <Hero />
    <section id="main-content" style={{ padding: '5rem 1.5rem', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 300, color: '#2C1F16', marginBottom: '1.5rem' }}>
        Welcome to our family
      </h2>
      <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1.1rem', color: '#6B5645', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
        We are the Jeons — a family navigating life one beautiful, messy, joyful moment at a time.
      </p>
    </section>
  </>
);

export default Home;
