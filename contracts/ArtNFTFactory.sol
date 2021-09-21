pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { SafeMath } from "./openzeppelin-solidity/contracts/math/SafeMath.sol";
import { Strings } from "./libraries/Strings.sol";
import { ArtNFTFactoryStorages } from "./art-nft-factory/ArtNFTFactoryStorages.sol";
import { ArtNFT } from "./ArtNFT.sol";
import { ArtNFTmarketplace } from "./ArtNFTMarketplace.sol";
import { ArtNFTData } from './ArtNFTData.sol';

contract ArtNFTFactory is ArtNFTFactoryStorages {
    using SafeMath for uint256;
    using Strings for string;

    address[] public artAddresses;
    address ART_NFT_MARKETPLACE;

    ArtNFTmarketplace public artNFTmarketplace;
    ArtNFTData public artNFTdata;

    constructor(ArtNFTmarketplace _artNFTmarketplace, ArtNFTData _artNFTData) public {
        artNFTmarketplace = _artNFTmarketplace;
        artNFTdata = _artNFTData;
        ART_NFT_MARKETPLACE = address(artNFTmarketplace);
    }

    function createNewArtNFT(string memory nftName, string memory nftDetail, string memory nftSPfield, string memory nftSymbol, uint artPrice, string memory ipfsHashOfArt) public returns (bool) {
        address owner = msg.sender;
        string memory tokenURI = getTokenURL(ipfsHashOfArt);
        ArtNFT artNFT = new ArtNFT(owner, nftName, nftSymbol, nftDetail, tokenURI, artPrice);
        artAddresses.push(address(artNFT));

        artNFTdata.saveMetadataofArtNFT(artAddresses, artNFT, nftName, nftSymbol, nftDetail, nftSPfield, msg.sender, artPrice, ipfsHashOfArt);
        artNFTdata.updateStatus(artNFT, "Open");

        emit ArtNFTCreated(msg.sender, artNFT, nftName, nftSymbol, nftDetail, artPrice, ipfsHashOfArt);
    }

    function baseTokenURI() public pure returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function getTokenURL(string memory _ipfsHashOfPhoto) public view returns (string memory) {
        return Strings.strConcat(baseTokenURI(), _ipfsHashOfPhoto);
    }
}