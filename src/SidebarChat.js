import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import db from "./firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import "./SidebarChat.css";
import { Link } from "react-router-dom";

function SidebarChat({ id, name }) {
	/*
		Meaning of the variables:
			1. seed: Type <String>. The value used for creating random avatar URLs.
			2. messages: Type <Array>. Contains all the messages sent in the chat room.
		Props used.
			1. id: Type <String>. Contains the Id of the room.
			2. name: Type <String>. Contains the name of the chat room.
			3. addNewChat: Type <Boolean>. Tells whether to render a chat room or a "add new chat" section in the sidebar.
		
		This function renders the chat rooms in the sidebar.
	*/

	const [seed, setSeed] = useState();
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	//Below code extracts the messages associated with a given chatroom.
	//The messages are used for showing the most recent message sent in the chat room.
	//onSnapshot() is used for creating/subscribing a real time listener.
	//query(q) is for finding "messages" collection in a chatroom which is found using its "id" in the "rooms" collection.
	useEffect(() => {
		if (id) {
			const queryRef = collection(db, "rooms", id, "messages");
			const q = query(queryRef, orderBy("timestamp", "desc"));
			const unsub = onSnapshot(q, (snapshot) => {
				setMessages(snapshot.docs.map((doc) => doc.data()));
			});

			//Always unsubscribe your subscriptions to save bandwidth.
			return () => {
				unsub();
			};
		}
	}, []);

	return (
		<Link to={`rooms/${id}`}>
			<div className="sidebarChat">
				<Avatar src={`https://avatars.dicebear.com/api/micah/${seed}.svg`} />
				<div className="sidebarChat__info">
					<h2>{name}</h2>
					<p>{messages[0]?.message}</p>
				</div>
			</div>
		</Link>
	);
}

export default SidebarChat;
