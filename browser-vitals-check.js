// Browser Console Web Vitals Checker
// Paste this into your browser console to check Core Web Vitals

console.log('🚀 Core Web Vitals Monitor');
console.log('==========================');

// Check if web-vitals library is available
if (typeof webVitals !== 'undefined') {
  // Use web-vitals library if available
  webVitals.getCLS(console.log);
  webVitals.getFID(console.log);
  webVitals.getFCP(console.log);
  webVitals.getLCP(console.log);
  webVitals.getTTFB(console.log);
} else {
  // Manual Web Vitals measurement
  console.log('📊 Manual Web Vitals Measurement:');
  
  // Performance Navigation Timing API
  const perfData = performance.getEntriesByType('navigation')[0];
  const paintEntries = performance.getEntriesByType('paint');
  
  // Calculate basic metrics
  const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
  const loadComplete = perfData.loadEventEnd - perfData.loadEventStart;
  
  // First Contentful Paint
  const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
  const fcp = fcpEntry ? fcpEntry.startTime : 'Not available';
  
  console.log('📈 Results:');
  console.log(`• DOM Content Loaded: ${domContentLoaded.toFixed(2)}ms`);
  console.log(`• Load Complete: ${loadComplete.toFixed(2)}ms`);
  console.log(`• First Contentful Paint: ${typeof fcp === 'number' ? fcp.toFixed(2) + 'ms' : fcp}`);
  
  // Resource loading analysis
  const resources = performance.getEntriesByType('resource');
  const cssResources = resources.filter(r => r.name.includes('.css'));
  const jsResources = resources.filter(r => r.name.includes('.js'));
  const imageResources = resources.filter(r => /\.(jpg|jpeg|png|gif|webp|svg)/.test(r.name));
  
  console.log('\n🔍 Resource Analysis:');
  console.log(`• CSS Files: ${cssResources.length}`);
  console.log(`• JS Files: ${jsResources.length}`);
  console.log(`• Images: ${imageResources.length}`);
  
  // Check for render-blocking resources
  const renderBlockingCSS = cssResources.filter(css => 
    css.transferSize > 0 && !css.name.includes('data:')
  );
  
  if (renderBlockingCSS.length > 0) {
    console.log('\n⚠️  Potential render-blocking CSS:');
    renderBlockingCSS.forEach(css => {
      console.log(`  • ${css.name} (${(css.transferSize / 1024).toFixed(2)}KB)`);
    });
  }
  
  // Check Critical Resource Hints
  const preconnectLinks = document.querySelectorAll('link[rel="preconnect"]');
  const preloadLinks = document.querySelectorAll('link[rel="preload"]');
  
  console.log('\n🔗 Resource Hints:');
  console.log(`• Preconnect links: ${preconnectLinks.length}`);
  console.log(`• Preload links: ${preloadLinks.length}`);
  
  // Check if critical CSS is inlined
  const inlineStyles = document.querySelectorAll('style');
  const criticalStyles = Array.from(inlineStyles).filter(style => 
    style.textContent.length > 1000 || style.dataset.critical
  );
  
  console.log(`• Inline styles: ${inlineStyles.length}`);
  console.log(`• Critical CSS detected: ${criticalStyles.length > 0 ? 'Yes' : 'No'}`);
  
  // LCP Candidate analysis
  const images = document.querySelectorAll('img');
  const largeImages = Array.from(images).filter(img => 
    img.offsetWidth > 300 || img.offsetHeight > 200
  );
  
  console.log('\n🖼️  Image Analysis:');
  console.log(`• Total images: ${images.length}`);
  console.log(`• Large images (potential LCP candidates): ${largeImages.length}`);
  
  // Check for lazy loading
  const lazyImages = Array.from(images).filter(img => 
    img.loading === 'lazy' || img.dataset.src
  );
  console.log(`• Lazy-loaded images: ${lazyImages.length}`);
}

// Performance recommendations
console.log('\n💡 Performance Tips:');
console.log('• Aim for FCP < 1.8s');
console.log('• Aim for LCP < 2.5s');
console.log('• Inline critical CSS to reduce render blocking');
console.log('• Use resource hints (preload, preconnect)');
console.log('• Optimize images with lazy loading and proper formats');

// Auto-refresh monitoring (optional)
console.log('\n🔄 To monitor continuously, run: setInterval(() => location.reload(), 30000)');
