import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, it adds the `.revealed` class.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    }, options);

    observer.observe(el);

    return () => observer.disconnect();
  }, [options]);

  return ref as React.RefObject<T>;
}

/**
 * useParallax — returns a ref that applies a CSS transform based on scroll position.
 * Usage: const ref = useParallax(0.3); <div ref={ref} />
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number = 0.3): React.RefObject<T> {
  const ref = useRef<T>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const offset = window.scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  // Suppress unused state warning — used to trigger initial render
  void setTick;

  return ref as React.RefObject<T>;
}
