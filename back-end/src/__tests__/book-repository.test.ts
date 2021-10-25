import { BookRepository } from "../repository/book-repository";
import { Book } from "../types/books";

describe("BookRepository", () => {
	beforeEach(() => {
		BookRepository.register();
	});

	afterEach(() => {
		BookRepository.reset();
	});
	test("singleton", (done) => {
		const instance1 = BookRepository.getInstance();
		const instance2 = BookRepository.getInstance();

		expect(instance1 === instance2).toBeTruthy;
		done();
	});

	describe("getAll", () => {
		test("Should return all books", (done) => {
			const books = BookRepository.getInstance().getAll();
			expect(books.length).toEqual(10);
			done();
		});
	});

	describe("get", () => {
		test("Should return book if available", (done) => {
			const book = BookRepository.getInstance().get("tjjrDwAAQBAJ");
			expect<Book>(book).toEqual<Book>({
				id: "tjjrDwAAQBAJ",
				authors: ["Alex Banks", "Eve Porcello"],
				year: 2020,
				description:
					"If you want to learn how to build efficient React applications, this is your book. Ideal for web developers and software engineers who understand how JavaScript, CSS, and HTML work in the browser, this updated edition provides best practices and patterns for writing modern React code. No prior knowledge of React or functional JavaScript is necessary. With their learning road map, authors Alex Banks and Eve Porcello show you how to create UIs that can deftly display changes without page reloads on large-scale, data-driven websites. You’ll also discover how to work with functional programming and the latest ECMAScript features. Once you learn how to build React components with this hands-on guide, you’ll understand just how useful React can be in your organization. Understand key functional programming concepts with JavaScriptLook under the hood to learn how React runs in the browserCreate application presentation layers with React componentsManage data and reduce the time you spend debugging applicationsIncorporate React Hooks to manage state and fetch dataUse a routing solution for single-page application featuresLearn how to structure React applications with servers in mind",
				coverImageUrl:
					"http://books.google.com/books/content?id=tjjrDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
				pageCount: 310,
				title: "Learning React",
			});
			done();
		});

		test("Should throw error if book with id is not found", (done) => {
			expect(() => BookRepository.getInstance().get("someId")).toThrow(
				`Book with id someId not found`
			);
			done();
		});
	});

	describe("deleteAll", () => {
		test("Should delete all books", (done) => {
			BookRepository.getInstance().deleteAll();
			const books = BookRepository.getInstance().getAll();
			expect(books.length).toEqual(0);
			done();
		});
	});

	describe("delete", () => {
		test("Should delete book if available", (done) => {
			BookRepository.getInstance().delete("tjjrDwAAQBAJ");
			const books = BookRepository.getInstance().getAll();
			expect(books.length).toEqual(9);
			done();
		});

		test("Should throw error if book with id is not found", (done) => {
			expect(() => BookRepository.getInstance().delete("someId")).toThrow(
				`Book with id someId not found`
			);
			done();
		});
	});
});
