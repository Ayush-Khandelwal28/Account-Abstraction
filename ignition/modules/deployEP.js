const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("EntryPoint", (m) => {

  const ep = m.contract("EntryPoint");

  return { ep };
});
