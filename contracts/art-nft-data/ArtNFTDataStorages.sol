pragma solidity ^0.5.16;

import { ArtNFTDataObjects } from './ArtNFTDataObjects.sol';

contract ArtNFTDataStorages is ArtNFTDataObjects {
    Art[] public arts;
    ArtDetail[] public artDetails;
}