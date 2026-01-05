const fs = require('fs');
const path = require('path');

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

    // Get top 10 users with rating
    const top10 = data.result
      .slice(0, 10)
      .map(user => ({
        handle: user.handle,
        rating: user.rating
      }));

    console.log('Top 10 handles:', top10);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(top10, null, 2));
    console.log(`Successfully updated ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('Failed to update legends:', error);
    process.exit(1);
  }
}

updateLegends();