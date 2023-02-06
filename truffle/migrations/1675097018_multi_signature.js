var MultiSignature = artifacts.require("MultiSignature");

module.exports = function(deployer) {
    deployer.deploy(MultiSignature, 3);
};
