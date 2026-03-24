import CurrentGallery from '../components/Gallery/CurrentGallery';

export default function Current() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-warm-white, #FDFAF5)' }}>
      <CurrentGallery />
    </main>
  );
}
