const express = require('express');
const request = require('request');
const app = express();

const TARGET_STREAM = 'http://raztv.online/live/MAGNL39E26/hvhS6xsuZP/1339214.ts';

// 1. ആപ്പിൽ കാണാൻ വേണ്ടിയുള്ള സിമ്പിൾ HTML പ്ലെയർ പേജ്
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <html>
        <head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin:0;background:black;display:flex;justify-content:center;align-items:center;height:100vh;">
            <video controls autoplay playsinline style="width:100%;height:100%;">
                <source src="/stream.ts" type="video/mp2t">
            </video>
        </body>
        </html>
    `);
});

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

module.exports = app;
