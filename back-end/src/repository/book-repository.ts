import { reactBooks } from "../data/google-books-api-raw-response";
import { Book } from "../types/books";

export class BookRepository {
	private static _instance: BookRepository | undefined;
	private static data: Book[];
	private constructor() {}

	static getInstance() {
		if (!BookRepository._instance) {
			throw new Error("Book Repository not initialized");
		}

		return BookRepository._instance;
	}

	static register() {
		if (!BookRepository._instance) {
			BookRepository._instance = new BookRepository();
			BookRepository.data = transformGoogleRawData();
		}
	}

	static reset() {
		BookRepository._instance = undefined;
	}

	getAll(): Book[] {
		return BookRepository.data;
	}

	get(id: string): Book {
		const book = BookRepository.data.find((book) => book.id === id);
		if (!book) {
			throw new Error(`Book with id ${id} not found`);
		}
		return book;
	}

	delete(id: string) {
		const index = BookRepository.data.findIndex((book) => book.id === id);
		if (index === -1) {
			throw new Error(`Book with id ${id} not found`);
		}
		BookRepository.data.splice(index, 1);
	}

	deleteAll() {
		BookRepository.data = [];
	}
}

function transformGoogleRawData(): Book[] {
	const books = reactBooks.items.map<Book>((item) => {
		return {
			id: item.id,
			authors: item.volumeInfo.authors,
			description: item.volumeInfo.description,
			coverImageUrl: item.volumeInfo.imageLinks?.thumbnail || "",
			pageCount: item.volumeInfo.pageCount,
			title: item.volumeInfo.title,
			year: new Date(item.volumeInfo.publishedDate).getFullYear(),
		};
	});

	return books;
}
