pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { SafeMath } from "./openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ArtNFT } from "./ArtNFT.sol";
import { ArtNFTTradable } from "./ArtNFTTradable.sol";
import { ArtNFTMarketplaceEvents } from "./art-nft-marketplace/ArtNFTMarketplaceEvents.sol";
import { ArtNFTData } from "./ArtNFTData.sol";
import { Strings } from "./libraries/Strings.sol";

contract ArtNFTmarketplace is ArtNFTTradable, ArtNFTMarketplaceEvents {
    using SafeMath for uint256;

    address public ART_NFT_MARKETPLACE = Strings.parseAddr("0x976d53c3E3f6Fab8a7433Dfe4fA6D17885fDdE0c");

    ArtNFTData public artNFTData;

    uint public TRANSACTION_FEE_PERCENT = 3;

    constructor(ArtNFTData _artNFTData) public ArtNFTTradable(_artNFTData) {
        artNFTData = _artNFTData;
    }

    function buyPhotoNFT(ArtNFT _artNFT) public payable returns (bool) {
        ArtNFT artNFT = _artNFT;
        ArtNFTData.Art memory art = artNFTData.getArtByNFTAddress(artNFT);
        address _seller = art.ownerAddress;
        address payable seller = address(uint160(_seller));
        uint buyAmount = art.artPrice;

        require(msg.value == buyAmount, "msg.value should be equal to the buyAmount");

        uint marketplace_fee = getMarketplaceFee(msg.value);

        seller.transfer( msg.value - marketplace_fee );  // send fee to owner

        address payable marketplace = address(uint160(ART_NFT_MARKETPLACE));
        marketplace.transfer( marketplace_fee );   // send fee to the marketplace

        address buyer = msg.sender;
        uint artId = 1;
        address ownerBeforeOwnershipTransferred = artNFT.ownerOf(artId);

        artNFTData.updateOwnerOfArtNFT(artNFT, buyer);
        artNFTData.updateStatus(artNFT, "Cancelled");

        address ownerAfterOwnershipTransferred = artNFT.ownerOf(artId);
        emit ArtNFTOwnershipChnaged(artNFT, artId, ownerBeforeOwnershipTransferred, ownerAfterOwnershipTransferred);
    }
    
    function ArtNFTUpdate(ArtNFT _artNFT, string memory title, string memory detail) public returns (bool) {
        ArtNFT artNFT = _artNFT;
        uint artId = 1;
        ArtNFTData.Art memory art = artNFTData.getArtByNFTAddress(artNFT);
        artNFTData.UpdateArtdata(artNFT, title, detail);
        
        emit ArtUpdated(artNFT, artId);
    }

    function reputation(address from, address to, uint256 artId) public returns (uint256, uint256) {
        return (0, 0);
    }

    function getReputationCount(uint256 artId) public view returns (uint256) {
        uint256 currentReputationCount;

        return currentReputationCount;
    }

    function getMarketplaceFee(uint price) public returns (uint) {
        return price * TRANSACTION_FEE_PERCENT / 100;
    }
}