import React from "react";
const win: any = window;
const getEthereumObject = () => win.ethereum;

const Navbar = ({ accounts, setAccounts }: any) => {
	const isConnected = Boolean(accounts[0]);
	const ethereum = getEthereumObject();
	const connectAccount = async () => {
		try {
			if (!ethereum) {
				alert("Get MetaMask!");
				return;
			}

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});

			console.log("Connected", accounts[0]);
			setAccounts(accounts[0]);
		} catch (error) {
			console.error(error);
		}
	};

	// const connectAccount = async () => {
	// 	if (ethereum) {
	// 		const accounts = await ethereum.request({
	// 			method: "eth_requestAccounts",
	// 		});
	// 		setAccounts(accounts);
	// 	}
	// 	console.log('click')
	// };
	return (
		<nav className="navbar">
			{/* Left Side - Social Media Icons */}
			<div className="nav-left nav-box">
				<li>Facebook</li>
				<li>Twitter</li>
				<li>Email</li>
			</div>
			{/* Right Side - Sections and Connect */}
			<div className="nav-right nav-box">
				<div className="nav">
					<li>About</li>
					<li>Mint</li>
					<li>Team</li>
				</div>
				<div className="nav">
					{/* Connected */}
					{isConnected ? (
						<li>Connected</li>
					) : (
						<button className="btn" onClick={connectAccount}>
							Connect
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
