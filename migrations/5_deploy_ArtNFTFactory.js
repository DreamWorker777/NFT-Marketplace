const ArtNFTmarketplace = artifacts.require("./ArtNFTMarketplace.sol");
const ArtNFTFactory = artifacts.require("./ArtNFTFactory.sol");
const ArtNFTData = artifacts.require("./ArtNFTData.sol");

const _artNFTMarketPlace = ArtNFTmarketplace.address;
const _artNFTData = ArtNFTData.address;

module.exports = async function(deployer) {
    await deployer.deploy(ArtNFTFactory, _artNFTMarketPlace, _artNFTData);
};
