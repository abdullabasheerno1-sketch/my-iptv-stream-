const express = require('express');
const request = require('request');
const app = express();

const TARGET_STREAM = 'http://raztv.online/live/MAGNL39E26/hvhS6xsuZP/1339214.ts';

app.get('/stream', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.pipe(request(TARGET_STREAM)).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
