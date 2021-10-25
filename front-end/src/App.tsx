import { useEffect } from "react";
import { useGlobalState } from "./providers/GlobalStateProvider";
import { Header } from "./components/Header";
import { BookList } from "./components/BookList";

export const App = () => {
	const {
		actions: { initialize },
		state: { isLoading },
	} = useGlobalState();

	useEffect(() => {
		initialize({ payload: {} });
	}, [initialize]);
	return !isLoading ? (
		<>
			<Header />
			<BookList />
		</>
	) : null;
};
