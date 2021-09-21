pragma solidity ^0.5.16;

import { ArtNFT } from "../ArtNFT.sol"; 

contract ArtNFTFactoryEvents {
    event ArtNFTCreated(
        address owner,
        ArtNFT artNFT,
        string nftname,
        string nftSymbol,
        string nftDetail,
        uint artPrice,
        string ipfsHashOfArt
    );
    event AddReputation (
        uint256 tokenId,
        uint256 reputationCount
    );
}