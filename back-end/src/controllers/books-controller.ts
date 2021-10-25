import { Request, Response, NextFunction } from "express";
import { apiErrorHandler } from "../handlers/errorHandler";
import { BookRepository } from "../repository/book-repository";

export class BooksController {
	constructor() {}

	getBooks(req: Request, res: Response, next: NextFunction) {
		try {
			res.json(BookRepository.getInstance().getAll());
		} catch (error) {
			apiErrorHandler(error, req, res, `Books API failed with :  ${error}`);
		}
	}

	getBook(req: Request, res: Response, next: NextFunction) {
		try {
			res.json(BookRepository.getInstance().get(req.params.bookId));
		} catch (error) {
			apiErrorHandler(error, req, res, `Books API failed with :  ${error}`);
		}
	}

	delete(req: Request, res: Response, next: NextFunction) {
		try {
			BookRepository.getInstance().delete(req.params.bookId);
			res.json("success");
		} catch (error) {
			apiErrorHandler(error, req, res, `Books API failed with :  ${error}`);
		}
	}

	deleteAllBooks(req: Request, res: Response, next: NextFunction) {
		try {
			BookRepository.getInstance().deleteAll();
			res.json("success");
		} catch (error) {
			apiErrorHandler(error, req, res, `Books API failed with :  ${error}`);
		}
	}
}
