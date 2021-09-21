const ArtNFTTradable = artifacts.require("./ArtNFTTradable.sol");
const artData =  artifacts.require("./ArtNFTData.sol");


const _artData = artData.address;

module.exports = async function(deployer) {
    await deployer.deploy(ArtNFTTradable, _artData)
}