import { Application, urlencoded, json } from "express";
import * as helmet from "helmet";
import * as cors from "cors";

import { Routes } from "./routes";
import { BookRepository } from "./repository/book-repository";

var corsOptions = {
	origin: "http://localhost:3000",
};

export class BookServer {
	constructor(app: Application) {
		this.config(app);
		new Routes(app);
	}

	public config(app: Application): void {
		app.use(cors(corsOptions));
		app.use(urlencoded({ extended: true }));
		app.use(json());
		app.use(helmet());
	}
}

process.on("beforeExit", function (err) {
	console.error(err);
});
