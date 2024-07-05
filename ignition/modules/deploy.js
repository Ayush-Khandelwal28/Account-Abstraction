const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Deployment", (m) => {
    const af = m.contract("AccountFactory");
    const ep = m.contract("EntryPoint");
    const pm = m.contract("Paymaster");

    return { af, ep, pm };
});
