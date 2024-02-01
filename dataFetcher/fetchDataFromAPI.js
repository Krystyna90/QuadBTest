async function fetchDataFromAPI(pool) {
    try {
        const response = await fetch('https://api.wazirx.com/api/v2/tickers')
        const data = await response.json();
        const top10Tickers = Object.values(data)
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 10);

        await Promise.all(top10Tickers.map(async (ticker) => {
          const { name, last, buy, sell, volume, base_unit } = ticker;

          const query = {
            text: 'INSERT INTO hodlinfo (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [name, last, buy, sell, volume, base_unit],
             };

          await pool.query(query);
         }));
    } catch (error) {
        throw error;
    } finally {
        await pool.end();
    }
}

module.exports = fetchDataFromAPI