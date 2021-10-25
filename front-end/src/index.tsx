import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { GlobalStateProvider } from "./providers/GlobalStateProvider";

ReactDOM.render(
	<React.Fragment>
		<GlobalStateProvider
			defaultState={{
				books: [],
				isLoading: false,
				numberOfAsyncActions: 0,
				selectedBook: undefined,
			}}
		>
			<App />
		</GlobalStateProvider>
	</React.Fragment>,
	document.getElementById("root")
);
