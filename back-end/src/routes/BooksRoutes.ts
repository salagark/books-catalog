import { Router } from "express";
import { BooksController } from "../controllers/books-controller";
import { BookRepository } from "../repository/book-repository";

export class BooksRoutes {
	router = Router();
	booksController = new BooksController();

	constructor() {
		this.intializeRoutes();
		BookRepository.register();
	}

	intializeRoutes() {
		this.router.route("/").get(this.booksController.getBooks);
		this.router.route("/:bookId").get(this.booksController.getBook);
		this.router.route("/").delete(this.booksController.deleteAllBooks);
	}
}
