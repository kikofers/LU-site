// --- Swap section images for dark mode ---
function updateSectionImagesForDarkMode() {
  const isDark = document.body.classList.contains('dark');
  document.querySelectorAll('.section-img, #title img[alt="Title image"]').forEach(img => {
    const lightSrc = img.getAttribute('data-light');
    const darkSrc = img.getAttribute('data-dark');
    if (isDark && darkSrc) {
      if (img.src !== location.origin + '/' + darkSrc && !img.src.endsWith(darkSrc)) {
        img.src = darkSrc;
      }
    } else if (lightSrc) {
      if (img.src !== location.origin + '/' + lightSrc && !img.src.endsWith(lightSrc)) {
        img.src = lightSrc;
      }
    }
  });
}

// Listen for dark mode changes on body, not documentElement
const darkModeObserver = new MutationObserver(updateSectionImagesForDarkMode);
darkModeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
// Initial run
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateSectionImagesForDarkMode);
} else {
  updateSectionImagesForDarkMode();
}
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for section animation using Tailwind classes only
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0');
        void entry.target.offsetWidth;
        entry.target.classList.add('opacity-100');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0 });

  // Force a scroll event to trigger observer for already visible sections
  setTimeout(() => { window.scrollBy(0, 1); window.scrollBy(0, -1); }, 100);

  // Target all main content sections
  const sections = document.querySelectorAll('main > section');
  sections.forEach(el => {
    observer.observe(el);
  });

  // Support both desktop and mobile dark mode toggles
  const darkModeToggles = [
    document.getElementById('darkModeToggleDesktop'),
    document.getElementById('darkModeToggleMobile')
  ];
  const body = document.body;

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.toggle('dark', savedTheme === 'dark');
  } else {
    // If no saved theme, use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.classList.toggle('dark', prefersDark);
  }

  // Update the button icons based on the current theme
  const updateButtonIcons = () => {
    const isDarkMode = body.classList.contains('dark');
    darkModeToggles.forEach(btn => {
      if (btn) {
        const img = btn.querySelector('img');
        if (img) img.src = isDarkMode ? 'photos/to_light.png' : 'photos/to_dark.png';
      }
    });
  };
  updateButtonIcons();

  // Add event listener to toggle dark mode for both buttons
  darkModeToggles.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateButtonIcons();
      });
    }
  });

  // Toggle the visibility of the navigation links on mobile
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('opacity-100');
    if (isOpen) {
      mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
      mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    } else {
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
    }
  });

  // Preload both light and dark images for all section images to avoid reloads on theme switch
  document.querySelectorAll('.section-img, #title img[alt="Title image"]').forEach(img => {
    const lightSrc = img.getAttribute('data-light');
    const darkSrc = img.getAttribute('data-dark');
    if (lightSrc) {
      const preloadLight = new Image();
      preloadLight.src = lightSrc;
    }
    if (darkSrc) {
      const preloadDark = new Image();
      preloadDark.src = darkSrc;
    }
  });
});