const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AccountFactory", (m) => {

    const af = m.contract("AccountFactory");

    return { af };
});
