pragma solidity ^0.5.16;

import { ArtNFT } from "../ArtNFT.sol";

contract ArtNFTDataObjects {
    struct Art {
        ArtNFT artNFT;
        string artNFTname;
        string artNFTSymbol;
        address ownerAddress;
        address creatorAddress;
        uint artPrice;
        string ipfsHashofArt;
        string status;
        uint256 reputation;
    }

    struct ArtDetail {
        string artNFTdetail;
        string artNFTspfield; //cartegory(+)keyword(+)type(+)timestemp
    }
}