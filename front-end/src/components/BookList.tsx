import { Card, Divider, Header, Icon } from "semantic-ui-react";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { BookCard } from "./BookCard";
import { BookModal } from "./BookModal";

export const BookList = () => {
	const {
		state: { books },
	} = useGlobalState();

	return (
		<div className="container">
			<Divider horizontal>
				<Header as="h1">
					<Icon name="book" />
					Books
				</Header>
			</Divider>
			<Card.Group>
				{books.map((book, index) => {
					return <BookCard {...book} key={index} />;
				})}
			</Card.Group>
			<BookModal />
		</div>
	);
};
