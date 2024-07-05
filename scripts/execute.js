const hre = require("hardhat")

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
const EP_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
const PM_ADDRESS = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

async function main() {


    const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
    const sender = await hre.ethers.getCreateAddress({
        from: FACTORY_ADDRESS,
        nonce: FACTORY_NONCE,
    })

    const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
    const [signer0] = await hre.ethers.getSigners()
    const signer0Address = await signer0.getAddress()
    const initCode = "0x";
    // const initCode = FACTORY_ADDRESS + AccountFactory.interface.encodeFunctionData("createAccount", [signer0Address]).slice(2);

    const Account = await hre.ethers.getContractFactory("Account");

    // await ep.depositTo(PM_ADDRESS, {
    //     value: hre.ethers.parseEther("200")
    // })


    const userOp = {
        sender, //Smart Account address
        nonce: await ep.getNonce(sender, 0),
        initCode,
        callData: Account.interface.encodeFunctionData("increment"),
        callGasLimit: 200_000,
        verificationGasLimit: 200_000,
        preVerificationGas: 50_000,
        maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
        paymasterAndData: PM_ADDRESS,
        signature: "0x",
    }

    const tx = await ep.handleOps([userOp], signer0Address)
    const receipt = await tx.wait()
    console.log(receipt)
    console.log("Sender is : ", sender)

}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})