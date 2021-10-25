import { Application } from "express";
import { BooksRoutes } from "./BooksRoutes";

export class Routes {
	constructor(app: Application) {
		// email reoutes
		app.use("/api/books", new BooksRoutes().router);
	}
}
