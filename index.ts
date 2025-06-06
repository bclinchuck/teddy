<<<<<<< HEAD
import express, {Express, Request, Response} from "express";

const port = 3000;
const app: Express = express();

app.get("/ping", (req, res) => {
=======
//const _ = require("lodash")
//console.log(_.toUpper("Hello Brandon"))
import express, {Express, Request, Response} from "express";
const port = 3000;

const app: Express = express();

app.get("/ping", (req: Request, res: Response) => {
>>>>>>> 754cdfd (ping pong request on port 3000)
    res.status(200).send("pong");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});