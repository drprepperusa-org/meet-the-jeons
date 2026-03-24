import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, it adds the `.revealed` class
 * (you can also target the `.reveal` class in CSS for pre-reveal styles).
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
