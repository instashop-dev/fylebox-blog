// Performance optimization scripts - loaded asynchronously
(function() {
  'use strict';
  
  // Initialize all optimizations after DOM is ready
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeOptimizations);
    } else {
      initializeOptimizations();
    }
  }
  
  function initializeOptimizations() {
    // Use requestIdleCallback for non-critical optimizations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        initLinkPrefetching();
        initPerformanceOptimizer();
        initCodeBlockEnhancer();
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        initLinkPrefetching();
        initPerformanceOptimizer();
        initCodeBlockEnhancer();
      }, 100);
    }
  }
  
  // Link Prefetch Optimizer
  function initLinkPrefetching() {
    const prefetchedLinks = new Set();
    
    function prefetchLink(url) {
      if (prefetchedLinks.has(url)) return;
      prefetchedLinks.add(url);
      
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'document';
      document.head.appendChild(link);
    }
    
    function handleLinkHover(e) {
      const link = e.target.closest('a');
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        prefetchLink(link.href);
      }
    }
    
    document.addEventListener('mouseover', handleLinkHover, { passive: true });
    
    // Intersection observer for viewport prefetching
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target;
            if (link.href && link.href.startsWith(window.location.origin)) {
              prefetchLink(link.href);
            }
          }
        });
      }, { rootMargin: '50px' });
      
      document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]').forEach(link => {
        observer.observe(link);
      });
    }
  }
  
  // Performance Optimizer
  function initPerformanceOptimizer() {
    // Service worker registration - delayed to not block critical path
    if ('serviceWorker' in navigator) {
      setTimeout(() => {
        navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none'
        }).then(reg => {
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New content available, page will refresh on next visit');
                }
              });
            }
          });
        }).catch(error => {
          console.log('Service worker registration failed:', error);
        });
      }, 3000); // Delay service worker registration
    }
    
    // Optimize images with lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });
      
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  // Code Block Enhancer
  function initCodeBlockEnhancer() {
    const codeBlocks = document.querySelectorAll('pre code');
    if (codeBlocks.length === 0) return;
    
    codeBlocks.forEach(block => {
      const pre = block.parentElement;
      if (!pre || pre.querySelector('.copy-button')) return;
      
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.innerHTML = '<span>Copy</span>';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(block.textContent || '');
          button.innerHTML = '<span>Copied!</span>';
          setTimeout(() => {
            button.innerHTML = '<span>Copy</span>';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      });
      
      pre.style.position = 'relative';
      pre.appendChild(button);
    });
  }
  
  // Initialize
  init();
})();
