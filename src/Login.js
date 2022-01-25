import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "./firebase";

import "./Login.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Login() {
	/*
		variable meanings
		1. {}: Empty object.
	*/

	const [{}, dispatch] = useStateValue();

	//signIn() creates a popup for the user to sign in using the google API.
	//The process will be automatic after the initial sign-in.
	//dispatch() sends the given data to the reducer to add/replace in the top level state.
	const signIn = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((error) => console.log(error.message));
	};

	return (
		<div className="login">
			<div className="login__container">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"
					alt="whatsapp logo"
				/>
				<div className="login__text">
					<h1>Sign-In to WhatsApp</h1>
				</div>
				<Button onClick={signIn}>Sign-In with Google</Button>
			</div>
		</div>
	);
}

export default Login;
