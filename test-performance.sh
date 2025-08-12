#!/bin/bash

# Core Web Vitals Performance Test Script
# This script runs Lighthouse tests to measure FCP, LCP, and other metrics

echo "🚀 Starting Core Web Vitals Performance Test..."
echo "==============================================="

# Check if Lighthouse CLI is installed
if ! command -v lighthouse &> /dev/null; then
    echo "📦 Installing Lighthouse CLI..."
    npm install -g lighthouse
fi

# Build the site for production testing
echo "🔨 Building site for production..."
npm run build

# Start a simple HTTP server for the dist folder
echo "🌐 Starting production server..."
npx http-server dist -p 8080 -s &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Run Lighthouse audit
echo "🔍 Running Lighthouse audit..."
lighthouse http://localhost:8080 \
  --only-categories=performance \
  --chrome-flags="--headless" \
  --output=json \
  --output-path=./lighthouse-report.json

# Parse results and display key metrics
echo "📊 Performance Results:"
echo "======================"

if [ -f "./lighthouse-report.json" ]; then
    # Extract key metrics using jq (if available)
    if command -v jq &> /dev/null; then
        echo "First Contentful Paint (FCP):" $(cat lighthouse-report.json | jq -r '.audits["first-contentful-paint"].displayValue // "N/A"')
        echo "Largest Contentful Paint (LCP):" $(cat lighthouse-report.json | jq -r '.audits["largest-contentful-paint"].displayValue // "N/A"')
        echo "Cumulative Layout Shift (CLS):" $(cat lighthouse-report.json | jq -r '.audits["cumulative-layout-shift"].displayValue // "N/A"')
        echo "Time to Interactive (TTI):" $(cat lighthouse-report.json | jq -r '.audits["interactive"].displayValue // "N/A"')
        echo "Performance Score:" $(cat lighthouse-report.json | jq -r '.categories.performance.score * 100 // "N/A"')
    else
        echo "⚠️  jq not installed. Raw JSON report saved as lighthouse-report.json"
        echo "📄 Generated HTML report: lighthouse-report.html"
    fi
else
    echo "❌ Lighthouse report not generated"
fi

# Clean up
kill $SERVER_PID 2>/dev/null
echo "🧹 Cleanup completed"
echo "✅ Performance test finished!"
