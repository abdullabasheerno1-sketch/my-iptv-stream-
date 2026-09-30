const express = require('express');
const request = require('request');
const app = express();

const TARGET_STREAM = 'http://raztv.online/live/MAGNL39E26/hvhS6xsuZP/1339214.ts';

// 1. .m3u8 റിക്വസ്റ്റ് വരുമ്പോൾ അത് പ്ലേ ചെയ്യാൻ വേണ്ടിയുള്ള മാനിഫെസ്റ്റ് (Playlist) നൽകാൻ
app.get('/stream.m3u8', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    
    // വെർസൽ ലിങ്കിന്റെ ബേസ് വെച്ച് സ്ട്രീം റൂട്ട് സെറ്റ് ചെയ്യുന്നു
    const host = req.headers['host'];
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    
    const m3u8Content = `#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:10\n#EXTINF:10.0,\n${protocol}://${host}/stream.ts`;
    res.send(m3u8Content);
});

// 2. യഥാർത്ഥ സ്ട്രീം ഡാറ്റ പാസ്സ് ചെയ്യാൻ
app.get('/stream.ts', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.setHeader('Content-Type', 'video/mp2t');
    req.pipe(request(TARGET_STREAM)).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
