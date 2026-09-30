const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 10000;

const TARGET_STREAM = 'http://raztv.online/live/MAGNL39E26/hvhS6xsuZP/1339214.m3u8';

app.get('/', (req, res) => {
    res.send('IPTV Proxy is Live!');
});

app.get('/stream.m3u8', (req, res) => {
    req.socket.setTimeout(10 * 60 * 1000);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    
    request({
        url: TARGET_STREAM,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
    }).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
