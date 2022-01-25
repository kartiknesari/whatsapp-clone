import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import StateProvider from "./StateProvider";
import reportWebVitals from "./reportWebVitals";
import reducer, { initialState } from "./reducer";

//StateProvider is used for creating the top level user.
//This user will hold all your profile data.

ReactDOM.render(
	<React.StrictMode>
		<StateProvider reducer={reducer} initialState={initialState}>
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();