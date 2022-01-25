import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { query, addDoc, collection, onSnapshot } from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import { Tooltip } from "@mui/material";
import { actionTypes } from "./reducer";

function Sidebar() {
	/*
		variable meanings
		1. user: Type <Object>. Contains the top level user data such as the displayName and photoURL.
		2. rooms: Type <Array>. Contains the names of all the rooms that the user is participating in. 
	*/
	const [{ user }, dispatch] = useStateValue();
	const [rooms, setRooms] = useState([]);

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

	//To logout the user
	const logout = () => {
		dispatch({
			type: actionTypes.LOGOUT_USER,
			user: null,
		});
	};

	//For creating a new chatroom in firestore
	const createChat = () => {
		const roomName = prompt("Please enter name for chat");

		if (roomName) {
			const createChatroom = async () => {
				const docRef = await addDoc(collection(db, "rooms"), {
					name: roomName,
				});
				return docRef;
			};
			createChatroom()
				.then((success) =>
					console.log("Chatroom created, docref no: ", success)
				)
				.catch((e) => console.log("error: ", e));
		}
	};

	//Below code extracts the active rooms data from firestore.
	useEffect(() => {
		/*
			onSnapshot() is a firebase method that creates a real time listener.
			query(q) extracts all the documents(chat rooms) in the "rooms" collection.
			querySnapshot contains the data of all the rooms and their IDs.
		*/
		const q = query(collection(db, "rooms"));
		const unsub = onSnapshot(q, (querySnapshot) => {
			let tempArr = [];
			querySnapshot.forEach((doc) => tempArr.push([doc.id, doc.data()]));
			setRooms(
				tempArr.map((doc) => ({
					id: doc[0],
					data: doc[1],
				}))
			);
		});

		//Every subscription activated must be ended at the end of useEffect() to save bandwidth.
		return () => {
			unsub();
		};
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src={user.photoURL} />
				<div className="sidebar__headerRight">
					<Tooltip title="Status (Dummy button)">
						<IconButton>
							<DonutLargeIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Create chat room">
						<IconButton onClick={createChat}>
							<ChatIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="more">
						<IconButton
							aria-label="more"
							id="sidebar-long-button"
							aria-controls={open ? "sidebar-long-button-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={handleClick}
						>
							<MoreVertIcon />
						</IconButton>
					</Tooltip>
					<Menu
						id="sidebar-long-button-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "sidebar-long-button",
						}}
					>
						<MenuItem onClick={logout}>Logout</MenuItem>
					</Menu>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlinedIcon />
					<input placeholder="Search or start new chat" type="text" />
				</div>
			</div>
			<div className="sidebar__chats">
				{rooms.map((room) => (
					<SidebarChat key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
		</div>
	);
}

export default Sidebar;
