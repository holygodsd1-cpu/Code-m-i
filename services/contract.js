const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// ABI tối thiểu để đọc trạng thái
const abi = [
    "function isCheckedIn(address user) public view returns (bool)"
];

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  provider // không có private key — chỉ đọc
);

module.exports = contract;
