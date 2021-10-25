import { Card, Icon, Image } from "semantic-ui-react";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { Book } from "../types/book";

export const BookCard = (book: Book) => {
	const {
		actions: { selectBook },
	} = useGlobalState();

	return (
		<Card
			onClick={() => {
				selectBook({ bookId: book.id });
			}}
		>
			<Image src={book.coverImageUrl} wrapped ui={false} />
			<Card.Content>
				<Card.Header>{book.title}</Card.Header>
				<Card.Meta>
					<span className="date">Published On {book.year}</span>
				</Card.Meta>
			</Card.Content>
			<Card.Content extra>
				<Icon name="pagelines" />
				{book.pageCount} Pages
			</Card.Content>
		</Card>
	);
};
