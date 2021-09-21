pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { ERC721Full } from "./openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import { SafeMath } from "./openzeppelin-solidity/contracts/math/SafeMath.sol";

contract ArtNFT is ERC721Full {
    using SafeMath for uint256;

    uint256 public currentArtId;

    constructor(
        address owner,
        string memory _nftname,
        string memory _nftSymbol,
        string memory _nftdetail,
        string memory _tokenURI,
        uint artPrice
    ) public ERC721Full(_nftname, _nftSymbol){
        mint(owner, _tokenURI);
    }

    function mint(address to, string memory tokenURI) public returns (bool) {
        uint newArtId = getNextArtId();
        currentArtId++;
        _mint(to, newArtId);
        _setTokenURI(newArtId, tokenURI);
    }

    function getNextArtId() private returns (uint nextPhotoId) {
        return currentArtId.add(1);
    }
}
