// Test script to verify light theme only implementation
console.log('Testing light theme implementation...');

// Test 1: Check if dark class is not present on document element
const hasDarkClass = document.documentElement.classList.contains('dark');
console.log('Dark class present:', hasDarkClass);

// Test 2: Check localStorage values
const themeValue = localStorage.getItem('theme');
const colorThemeValue = localStorage.getItem('color-theme');
console.log('localStorage theme:', themeValue);
console.log('localStorage color-theme:', colorThemeValue);

// Test 3: Try to manually add dark class (should be prevented)
document.documentElement.classList.add('dark');
setTimeout(() => {
  const stillHasDarkClass = document.documentElement.classList.contains('dark');
  console.log('Dark class still present after manual add:', stillHasDarkClass);
}, 100);

// Test 4: Check if theme toggle button exists (should not)
const themeToggleButton = document.getElementById('theme-toggle');
console.log('Theme toggle button exists:', !!themeToggleButton);

console.log('Light theme test completed');
