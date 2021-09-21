pragma solidity ^0.5.16;

import { ArtNFT } from "../ArtNFT.sol";

contract ArtNFTMarketplaceEvents {
    event ArtNFTOwnershipChnaged (
        ArtNFT artNFT,
        uint artId,
        address ownerBeforeOwnershipTransferred,
        address ownerAfterOwnershipTransferred
    );

    event ArtUpdated (
        ArtNFT artNFT,
        uint artId
    );
}