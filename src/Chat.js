import { Avatar, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
	addDoc,
	deleteDoc,
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import db from "./firebase";
import "./Chat.css";
import { useStateValue } from "./StateProvider";

function Chat() {
	/*
		Meaning of the variables:
			1. user: Type <Object>. Contains user data. Use {user.displayName} to get user name.
			2. seed: Type <String>. The value used for creating random avatar URLs.
			3. input: Type <String>. The input message.
			4. roomName: Type <String>. The name of the chat room.
			5. messages: Type <Array>. Contains all the messages sent in the chat room.
		
		This function renders the chat room and it's functionalities.
	*/
	const [{ user }] = useStateValue();
	const [seed, setSeed] = useState("");
	const [input, setInput] = useState("");
	const [roomName, setRoomName] = useState("");
	const [messages, setMessages] = useState([]);

	//useParams() extracts the dynamic elements from a url. In this case the roomId after /rooms/:roomId
	let roomId = useParams();

	//for opening/closing the menu on clicking the "Three vertical dots" icon
	//Go to "https://mui.com/components/menus/" for more information
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	//To delete the chat room
	const deleteChatroom = async () => {
		const delName = prompt("Please confirm the chatroom name for deletion");
		if (delName === roomName) await deleteDoc(doc(db, "rooms", roomId.roomId));
		else alert("Please type the correct room name");
	};

	//Below code extracts the chat room name and the associated chats with the chat room.
	//This code only fires when the roomId changes.
	useEffect(() => {
		if (roomId) {
			const unsub = onSnapshot(doc(db, "rooms", roomId.roomId), (doc) => {
				setRoomName(doc.data().name);
			});
			const roomsRef = collection(db, "rooms", roomId.roomId, "messages");
			const q = query(roomsRef, orderBy("timestamp", "asc"));
			const unsubChatMessages = onSnapshot(q, (snapshot) => {
				setMessages(snapshot.docs.map((doc) => doc.data()));
			});

			return () => {
				unsub();
				unsubChatMessages();
			};
		}
	}, [roomId]);

	//Below code creates random seeds everytime a new chatroom is clicked.
	//This gives us different chat room avatars every time a chatroom is clicked in the sidebar.
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, [roomId]);

	const sendMessage = async (e) => {
		/*
			function is used for adding a message to the database.
			The time given in every message is the server time when the message was sent.
		*/

		//prevents page from reloading
		e.preventDefault();

		//The code for adding the message to firestore.
		const roomsRef = collection(db, "rooms", roomId.roomId, "messages");
		const docRef = await addDoc(roomsRef, {
			message: input,
			name: user.displayName,
			timestamp: serverTimestamp(),
		});

		//To set the input to blank after sending a message
		setInput("");
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar src={`https://avatars.dicebear.com/api/micah/${seed}.svg`} />
				<div className="chat__headerInfo">
					<h3>{roomName}</h3>
					<p>Last seen ...</p>
				</div>
				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<Tooltip title="more">
						<IconButton
							aria-label="more"
							id="chat-long-button"
							aria-controls={open ? "chat-long-button-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={handleClick}
						>
							<MoreVertIcon />
						</IconButton>
					</Tooltip>
					<Menu
						id="chat-long-button-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "chat-long-button",
						}}
					>
						<MenuItem onClick={deleteChatroom}>Delete Chatroom</MenuItem>
					</Menu>
				</div>
			</div>
			<div className="chat__body">
				{/*
					The below hardcoded code for a message would look like this.
					<p>
						<p>Amy (Sender's Name)</p>
						Hello(Message)
						<span>Mon, 24 Jan 2022 18:30:00 GMT(Time when message was sent)</span>
					</p>
				*/}
				{messages.map((message) => (
					<p
						//below condition makes the app distinguish whether the message is from you or someone else.
						className={`chat__message ${
							message.name === user.displayName && "chat__receiver"
						}`}
					>
						<p className="chat__name">{message.name}</p>
						{message.message}
						<span className="chat__timestamp">
							{new Date(message.timestamp?.toDate()).toUTCString()}
						</span>
					</p>
				))}
			</div>
			<div className="chat__footer">
				<InsertEmoticonOutlinedIcon />
				<AttachmentOutlinedIcon />
				<form action="">
					<input
						type="text"
						placeholder="Type a message"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button onClick={sendMessage} type="submit">
						Send a message
					</button>
				</form>
				<MicOutlinedIcon />
			</div>
		</div>
	);
}

export default Chat;
