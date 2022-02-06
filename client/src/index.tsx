import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/UserContext";
import { CssReset } from "./components/styles/cssReset";
import { CssVariables } from "./components/styles/cssVariables";

ReactDOM.render(
	<React.StrictMode>
		<UserProvider>
			<CssReset />
			<CssVariables />
			<App />
		</UserProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
