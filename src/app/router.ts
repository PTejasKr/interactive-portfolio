// router.ts - Simple hash-based router for SPA navigation

type Route = {
  path: string;
  sectionId: string;
};

const routes: Route[] = [
  { path: '#landing', sectionId: 'landing' },
  { path: '#skills', sectionId: 'skills' },
  { path: '#projects', sectionId: 'projects' },
  { path: '#experience', sectionId: 'experience' },
  { path: '#about', sectionId: 'about' },
  { path: '#contact', sectionId: 'contact' },
];

export function initRouter(): void {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute(): void {
  const hash = window.location.hash || '#landing';
  const route = routes.find((r) => r.path === hash);

  if (route) {
    scrollToSection(route.sectionId);
  }
}

function scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

export function navigateTo(path: string): void {
  window.location.hash = path;
}
