import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useGlobalState } from "../providers/GlobalStateProvider";

export const BookModal = () => {
	const {
		state: { selectedBook },
		actions: { selectBook },
	} = useGlobalState();

	if (!selectedBook) {
		return null;
	}
	return (
		<Modal open onClose={() => selectBook({ bookId: "" })}>
			<Modal.Header>{selectedBook.title}</Modal.Header>
			<Modal.Content image scrolling>
				<Image size="big" src={selectedBook.coverImageUrl} wrapped ui={false} />
				<Modal.Description>
					<Header as="h2">Authors : {selectedBook.authors.join(", ")}</Header>
					<Header as="h2">Year : {selectedBook.year}</Header>
					<p>{selectedBook.description}</p>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={() => selectBook({ bookId: "" })}>
					Close
				</Button>
			</Modal.Actions>
		</Modal>
	);
};
