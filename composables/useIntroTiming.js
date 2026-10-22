// Shared timing for the page-load intro so NavBar and the home hero stay in sync.
export const INTRO = {
  delay: 0.2,      // both start at the same moment
  duration: 1,
  stagger: 0.1,
  ease: 'power4.out',
  imageDuration: 1.4
};

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
