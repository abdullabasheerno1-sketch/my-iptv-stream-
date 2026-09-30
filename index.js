const express = require('express');
const request = require('request');
const app = express();

const TARGET_STREAM = 'http://raztv.online/live/MAGNL39E26/hvhS6xsuZP/1339214.ts';

app.get('/stream.m3u8', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-STREAM-INF:BANDWIDTH=800000\n/stream.ts');
});

app.get('/stream.ts', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'video/mp2t');
    req.pipe(request(TARGET_STREAM)).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
