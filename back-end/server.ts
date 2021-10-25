import * as express from "express";
import { Application } from "express";

import { BookServer } from "./src/index";

const app: Application = express();
const server = new BookServer(app);
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.listen(port, "localhost", function () {
	console.info(`Server running on : http://localhost:${port}`);
}).on("error", (err: any) => {
	if (err.code === "EADDRINUSE") {
		console.log("server startup error: address already in use");
	} else {
		console.log(err);
	}
});
