const ArtNFTData = artifacts.require("./ArtNFTData.sol");

module.exports = async function(deployer) {
    await deployer.deploy(ArtNFTData);
};