const express = require('express');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 10000;

const TARGET_URL = 'http://raztv.online/live/MAGNL39E26/hvhS6xsuZP/1339214.m3u8';

app.get('/', (req, res) => {
    res.send('IPTV Proxy is Running');
});

app.get('/stream.m3u8', (req, res) => {
    http.get(TARGET_URL, (streamRes) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        streamRes.pipe(res);
    }).on('error', (err) => {
        res.status(500).send('Proxy Error');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
