import { Book } from "../types/book";
import http from "./http-common";

class BookService {
	async getBooks(): Promise<Book[]> {
		const response = await http.get(`/books`);

		return response.data as Book[];
	}
}

export default new BookService();
