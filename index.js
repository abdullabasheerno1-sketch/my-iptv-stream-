const express = require('express');
const http = require('http');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 10000;

const TARGET_STREAM = 'http://raztv.online/live/MAGNL39E26/hvhS6xsuZP/1339214.m3u8';

app.get('/', (req, res) => {
    res.send('IPTV Proxy is Live!');
});

app.get('/stream.m3u8', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');

    const client = TARGET_STREAM.startsWith('https') ? https : http;

    client.get(TARGET_STREAM, (streamRes) => {
        streamRes.pipe(res);
    }).on('error', (err) => {
        res.status(500).send('Stream error: ' + err.message);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
