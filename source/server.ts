import express from 'express';

const app = express();
const port = 3000;

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.listen(port, () => {
    console.log('Server is running at http://localhost:${port}');
});