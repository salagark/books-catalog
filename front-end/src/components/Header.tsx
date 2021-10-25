import { Icon, Menu } from "semantic-ui-react";

export const Header = () => {
	return (
		<Menu fixed="top" color="violet" inverted>
			<Menu.Item as="a" header href="/">
				<Icon name="book" size="large" />
			</Menu.Item>
			<Menu.Item as="a" header href="/">
				Home
			</Menu.Item>
		</Menu>
	);
};
