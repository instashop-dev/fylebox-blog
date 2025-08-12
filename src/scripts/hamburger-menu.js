// Hamburger menu script - minimal and optimized
(function() {
  'use strict';
  
  function initHamburgerMenu() {
    const hamburger = document.querySelector('[data-collapse-toggle]');
    if (!hamburger) return;
    
    const targetId = hamburger.getAttribute('data-collapse-toggle');
    const menu = document.getElementById(targetId);
    if (!menu) return;
    
    function toggleMenu() {
      const isHidden = menu.classList.contains('hidden');
      
      if (isHidden) {
        menu.classList.remove('hidden');
        hamburger.setAttribute('aria-expanded', 'true');
      } else {
        menu.classList.add('hidden');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
    
    // Event listeners
    hamburger.addEventListener('click', toggleMenu);
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        menu.classList.add('hidden');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
  } else {
    initHamburgerMenu();
  }
})();
