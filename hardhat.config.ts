import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
	solidity: "0.8.17",
	networks: {
		goerli: {
			// This value will be replaced on runtime
			url: `${process.env.REACT_APP_GOERLI_URL}`,
			accounts: [`${process.env.REACT_APP_PRIVATE_KEY}`],
		},
		etherscan: {
			url: `${process.env.REACT_APP_ETHERSCAN_KEY}`,
		},
	},
};

export default config;
