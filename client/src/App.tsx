import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MainMint from "./components/MainMint";

function App() {
	const [accounts, setAccounts] = useState([]);

	return (
		<div className="app">
			<video className="video_bg" src="/video-2.mp4" autoPlay loop muted />

			<Navbar accounts={accounts} setAccounts={setAccounts} />
			<MainMint accounts={accounts} setAccounts={setAccounts} />
		</div>
	);
}

export default App;
