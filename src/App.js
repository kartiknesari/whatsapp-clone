import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Login from "./Login";

function App() {
	//Variable meanings
	// 1. user: Type <Object>. Contains user data.

	const [{ user }] = useStateValue();

	return (
		//Below code redirects to Login page if user isn't logged in. (User value is null)
		//Otherwise logs in to the chats page
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<div className="app__body">
					<BrowserRouter>
						<Sidebar />
						<Routes>
							<Route path="/rooms/:roomId" element={<Chat />} />
						</Routes>
					</BrowserRouter>
				</div>
			)}
		</div>
	);
}

export default App;
