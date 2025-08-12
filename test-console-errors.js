import puppeteer from 'puppeteer';

async function checkConsoleErrors(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleMessages = [];
  const errors = [];

  // Listen for console messages
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    consoleMessages.push({ type, text });
    
    if (type === 'error') {
      errors.push(text);
      console.log(`❌ Console Error: ${text}`);
    } else if (type === 'warning') {
      console.log(`⚠️  Console Warning: ${text}`);
    }
  });

  // Listen for page errors
  page.on('pageerror', error => {
    errors.push(error.message);
    console.log(`❌ Page Error: ${error.message}`);
  });

  try {
    console.log(`🔍 Testing: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Wait a bit for any dynamic content to load
    await page.waitForTimeout(2000);

    if (errors.length === 0) {
      console.log('✅ No console errors found!');
    } else {
      console.log(`❌ Found ${errors.length} error(s):`);
      errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }

    return {
      url,
      errorCount: errors.length,
      errors,
      allMessages: consoleMessages
    };

  } catch (error) {
    console.error(`Failed to test ${url}:`, error.message);
    return {
      url,
      errorCount: 1,
      errors: [error.message],
      allMessages: consoleMessages
    };
  } finally {
    await browser.close();
  }
}

// Get URL from command line argument
const testUrl = process.argv[2] || 'http://localhost:4323/';

checkConsoleErrors(testUrl)
  .then(result => {
    process.exit(result.errorCount === 0 ? 0 : 1);
  })
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });