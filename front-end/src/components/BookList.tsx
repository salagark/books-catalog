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
				<Header as="h4">
					<Icon name="book" />
					Books
				</Header>
			</Divider>
			<Card.Group>
				{books.map((book) => {
					return <BookCard {...book} />;
				})}
			</Card.Group>
			<BookModal />
		</div>
	);
};
