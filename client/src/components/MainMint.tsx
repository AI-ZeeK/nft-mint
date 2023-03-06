import React, { useState } from "react";
import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import roboPunksNFT from "../RoboPunkNFT.json";
const roboPunksNFTAddress = "0x26211539EDe9b4659589893829dDb06E5f56AA49";

const MainMint = ({ accounts, setAccounts }: any) => {
	const [mintAmount, setMintAmount] = useState<number>(1);
	const [data, setData] = useState<string>([]);
	const isConnected = Boolean(accounts[0]);
	const { ethereum }: any = window;

	const handleMint = async () => {
		console.log(ethereum, ethers)
		// try {
			const provider =await  new ethers.providers.Web3Provider(ethereum);
			const signer =await provider.getSigner();
			const contract =await new ethers.Contract(
				roboPunksNFTAddress,
				roboPunksNFT.abi,
				signer
			);
			const res = await contract.mint(BigNumber.from(mintAmount));
			console.log(res, "res");
				setData([...data, res])
		// } catch (error) {
		// 	console.log(error, "error");
		// }
		console.log(data)
	};
	console.log(data)
	const handleDecrement = () => {
		if (mintAmount <= 1) return;
		setMintAmount(mintAmount - 1);
	};
	const handleIncrement = () => {
		if (mintAmount >= 3) return;
		setMintAmount(mintAmount + 1);
	};
	const handleChange = () => {
		console.log("reeed");
	};

	return (
		<div className="mint-box">
			<h1>RoboPunks</h1>
			<p>
				It's 2078 can roboPunks save humans from ourselves ? Mint to find out
			</p>
			{isConnected ? (
				<div className="mint-box2">
					<div className="nav-box">
						<button onClick={handleDecrement}>-</button>
						<input type="number" onChange={handleChange} value={mintAmount} />
						<button onClick={handleIncrement}>+</button>
					</div>
					<button className="btn" onClick={handleMint}>
						Mint Now
					</button>
				</div>
			) : (
				<p>You must be Connected to mint</p>
			)}
		</div>
	);
};

export default MainMint;
