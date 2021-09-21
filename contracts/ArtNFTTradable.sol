pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { ArtNFT } from "./ArtNFT.sol";
import { ArtNFTData } from "./ArtNFTData.sol";

contract ArtNFTTradable {
    event TradeStatusChange(uint256 ad, bytes32 status);

    ArtNFT public artNFT;
    ArtNFTData public artNFTData;

    struct Trade {
        address seller;
        uint256 artId;
        uint256 artPrice;
        bytes32 status;
    }
    mapping(uint256 => Trade) public trades;

    uint256 tradeCounter;

    constructor(ArtNFTData _artNFTData) public {
        artNFTData = _artNFTData;
        tradeCounter = 0;
    }

    function openTradeWhenCreateNewPhotoNFT(ArtNFT artNFT, uint256 _artId, uint256 _artPrice) public {
        // console.log('trading', address(this));
        artNFT.transferFrom(msg.sender, address(this), _artId);

        tradeCounter += 1;
        trades[tradeCounter] =Trade({
            seller: msg.sender,
            artId: _artId,
            artPrice: _artPrice,
            status: "open"
        });

        emit TradeStatusChange(tradeCounter, "Open");
    }

    function openTrade(ArtNFT artNFT, uint256 _artID) public {
        artNFTData.updateStatus(artNFT, "open");

        Trade storage trade = trades[_artID];
        require(msg.sender == trade.seller, "Trade can be open only by seller");

        artNFT.transferFrom(msg.sender, address(this), trade.artId);
        trades[_artID].status = "open";
        emit TradeStatusChange(_artID, "open");
    }

    function cancelTrade(ArtNFT artNFT, uint256 _artId) public {
        artNFTData.updateStatus(artNFT, "Cancelled");
        Trade storage trade = trades[_artId];
        require(msg.sender == trade.seller, "Trade can be cancelled only by seller");
        require(trade.status == "open", "Trade is not Open");
        artNFT.transferFrom(address(this), trade.seller, trade.artId);
        trades[_artId].status = "Cancelled";
        emit TradeStatusChange(_artId, "Cancelled");
    }

    function transferOwnershipOfArtNFT(ArtNFT _artNFT, uint256 _artId, address _buyer) public {
        ArtNFT artNFT = _artNFT;
        Trade memory trade = getTrade(_artId);
        require(trade.status == "open", "Trade is not Open.");
        _updateSeller(_artNFT, _artId, _buyer);
        artNFT.transferFrom(address(this), _buyer, trade.artId);
        getTrade(_artId).status = "Cancelled";
        emit TradeStatusChange(_artId, "Cancelled");
    }

    function _updateSeller(ArtNFT artNFT, uint256 _artId, address _newSeller) internal {
        Trade storage trade = trades[_artId];
        trade.seller = _newSeller;
    }

    function getTrade(uint256 _artId) public view returns (Trade memory trade_) {
        Trade memory trade = trades[_artId];
        return trade;
    }

}
