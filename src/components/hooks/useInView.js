import { useEffect, useState } from 'react';

export function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      options
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return inView;
}
