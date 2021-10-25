import createReducerProvider, {
	AsynchronousStateEnum,
	PayloadAction,
} from "./createReducerProvider";
import bookService from "../services/book-service";
import { Book } from "../types/book";

interface GlobalState {
	books: Book[];
	isLoading: boolean;
	numberOfAsyncActions: number;
	selectedBook?: Book;
}

const implementation = {
	// eslint-disable-next-line
	initialize: ({ payload: {} }: PayloadAction<{ settings: any }, Book[]>) =>
		bookService.getBooks(),
};

function setAsynchronousState(state: GlobalState, action: PayloadAction) {
	state = { ...state };

	switch (action.asynchronous) {
		case AsynchronousStateEnum.Success:
		case AsynchronousStateEnum.Error:
			state.numberOfAsyncActions--;
			break;
		case AsynchronousStateEnum.Pending:
			state.numberOfAsyncActions++;
			break;
	}

	state.isLoading = state.numberOfAsyncActions > 0;

	return state;
}

const reducerSlice = {
	initialize(state: GlobalState, action: PayloadAction<string, Book[]>): GlobalState {
		state = setAsynchronousState(state, action);
		state = { ...state };

		state.books = action.result || [];
		return state;
	},

	selectBook(state: GlobalState, action: PayloadAction<{ bookId: string }, Book[]>): GlobalState {
		state = setAsynchronousState(state, action);
		state = { ...state };

		state.selectedBook = state.books.find((b) => b.id === action.payload.bookId);

		return state;
	},
};

const { useReducerProvider: useGlobalState, ReducerProvider: GlobalStateProvider } =
	createReducerProvider(
		reducerSlice,
		{ books: [], isLoading: false, numberOfAsyncActions: 0, selectedBook: undefined },
		implementation
	);

export { GlobalStateProvider, useGlobalState };
export default GlobalStateProvider;
