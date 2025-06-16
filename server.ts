import { createServer } from "node:http";
import express, { Request, Response } from "express";
import { Server } from "socket.io";

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get("/ping", (req, res) => {
	res.send("pong");
});

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
	console.log(`Connected: ${socket.id}`);

	socket.on("disconnect", () => {
		console.log(`Disconnected: ${socket.id}`);
	});
	socket.on("pingFromClient", () => {
		console.log("Ping received through socket.io");
		socket.emit("pongFromServer", "pong");
	});
});

httpServer.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
