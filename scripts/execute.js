const hre = require("hardhat")

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PM_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {


    const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
    const sender = await hre.ethers.getCreateAddress({
        from: FACTORY_ADDRESS,
        nonce: FACTORY_NONCE,
    })

    const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
    const [signer0,signer1] = await hre.ethers.getSigners()
    const signer0Address = await signer0.getAddress()
    const initCode = "0x";
    // const initCode = FACTORY_ADDRESS + AccountFactory.interface.encodeFunctionData("createAccount", [signer0Address]).slice(2);

    const Account = await hre.ethers.getContractFactory("Account");

    // await ep.depositTo(PM_ADDRESS, {
    //     value: hre.ethers.parseEther("200")
    // })

    const signature = signer0.signMessage(hre.ethers.getBytes(hre.ethers.id("Ayush")));   
    
    const userOp = {
        sender, //Smart Account address
        nonce: await ep.getNonce(sender, 0),
        initCode,
        callData: Account.interface.encodeFunctionData("increment"),
        callGasLimit: 400_000,
        verificationGasLimit: 400_000,
        preVerificationGas: 100_000,
        maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
        paymasterAndData: PM_ADDRESS,
        signature : "0x",
    }

    const userOpHash = await ep.getUserOpHash(userOp)
    userOp.signature = signer0.signMessage(hre.ethers.getBytes(userOpHash))

    const tx = await ep.handleOps([userOp], signer0Address)
    const receipt = await tx.wait()
    console.log(receipt)
    console.log("Sender is : ", sender)

}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})