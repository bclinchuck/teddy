//const _ = require("lodash")
//console.log(_.toUpper("Hello Brandon"))
import express, {Express, Request, Response} from "express";
const port = 3000;

const app: Express = express();

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("pong");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});