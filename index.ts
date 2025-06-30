import express, { type Express, Request, Response } from "express";

const port = 3000;
const app: Express = express();

app.get("/ping", (req, res) => {
	res.status(200).send("pong");
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
