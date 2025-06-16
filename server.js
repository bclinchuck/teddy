"use strict";

const express = require('express');
//const http = require('http');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/ping', (req, res) => {
    res.send('pong');
});

//const server = http.createServer(app);
// was server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});