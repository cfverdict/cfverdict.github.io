const fs = require('fs');
const path = require('path');

// Polyfill fetch for older Node environments if needed, 
// though Node 18+ has native fetch. GitHub Actions usually use latest Node.
// If fetch is missing, we might need 'node-fetch', but let's try native first.

const CF_API_URL = 'https://codeforces.com/api/user.ratedList?activeOnly=true&includeRetired=false';
const OUTPUT_FILE = path.join(__dirname, '../src/data/legends.json');

async function updateLegends() {
  try {
    console.log('Fetching rated list from Codeforces...');
    const response = await fetch(CF_API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`CF API Error: ${data.comment}`);
    }

    // Get top 10 handles
    // The API returns users sorted by rating descending by default
    const top10 = data.result
      .slice(0, 10)
      .map(user => user.handle);

    console.log('Top 10 handles:', top10);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(top10, null, 2));
    console.log(`Successfully updated ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('Failed to update legends:', error);
    process.exit(1);
  }
}

updateLegends();
