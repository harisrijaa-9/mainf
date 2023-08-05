const express = require('express');
const app = express();
const axios = require('axios');

// Your Ahrefs API key stored as an environmental variable
const apiKey = process.env.AHREFS_API_KEY;

// Enable CORS to allow cross-origin requests from the client-side code
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// API endpoint to fetch search volume data
app.get('/getSearchVolume', async (req, res) => {
    const keyword = req.query.keyword;
    const apiUrl = `https://api-v2.ahrefs.com/?target=keywords_for_site&keyword=${encodeURIComponent(keyword)}&country=us&language=en&from=ahrefs_academy&ahrefs_api_key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.keywords.length > 0) {
            const searchVolume = data.keywords[0].search_volume_us;
            res.json({ searchVolume: searchVolume });
        } else {
            res.json({ searchVolume: 'N/A' });
        }
    } catch (error) {
        console.error('Error fetching search volume:', error);
        res.status(500).json({ error: 'Error fetching search volume. Please try again later.' });
    }
});

const port = 5500;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
