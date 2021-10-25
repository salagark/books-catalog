import { Application } from "express";
import { BooksRoutes } from "./BooksRoutes";

export class Routes {
	constructor(app: Application) {
		app.use("/api/books", new BooksRoutes().router);
	}
}
