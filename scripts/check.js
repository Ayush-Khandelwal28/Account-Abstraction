const hre = require("hardhat");

const ACCOUNT_ADDRESS = "0x856e4424f806D16E8CBC702B3c0F2ede5468eae5"
const EP_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
const PM_ADDRESS = "0x0165878A594ca255338adfa4d48449f69242Eb8F"

async function main() {
    const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
    const count = await account.count();
    console.log(count.toString());

    console.log("Account Balance", await hre.ethers.provider.getBalance(ACCOUNT_ADDRESS));


    const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
    console.log("Account Balance on Entry Point", await ep.balanceOf(ACCOUNT_ADDRESS));
    console.log("Account Balance on Entry Point", await ep.balanceOf(PM_ADDRESS));

}

main().catch((error) => {
    console.error(error)
    process.exit(1)
});