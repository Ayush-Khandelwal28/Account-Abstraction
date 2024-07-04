const hre = require("hardhat");

const address = '0xa16E02E87b7454126E5E10d957A927A7F5B5d2be'

async function main() {
    const account = await hre.ethers.getContractAt("Account", address);
    const count = await account.count();
    console.log(count.toString());

}

main();