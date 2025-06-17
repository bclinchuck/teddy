"use strict";

import express, { Request, Response} from 'express';

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});