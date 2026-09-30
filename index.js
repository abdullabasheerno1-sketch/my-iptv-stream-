const express = require('express');
const request = require('request');
const app = express();

const TARGET_STREAM = 'http://raztv.online/live/MAGNL39E26/hvhS6xsuZP/1339214.m3u8';
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('IPTV Proxy Server is Running!');
});

app.get('/stream.m3u8', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    request(TARGET_STREAM).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
