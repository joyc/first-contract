import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity 0.8.14;

contract MintableERC721 is ERC721URIStorage, Ownable {
    // 通过合约owner去mint新的NFT，可以指定NFT的接收者地址及设置NFT对应的tokenId和uri
    
    uint256 public _CUR_TOKENID_;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(
        address[] calldata receivers,
        string[] calldata uris
    ) external onlyOwner {
        require(receivers.length == uris.length, "Please provide the same number of receivers and uris");
        for(uint256 i = 0; i < receivers.length; i++) {
            _safeMint(receivers[i], _CUR_TOKENID_);
            _setTokenURI(_CUR_TOKENID_, uris[i]);
            _CUR_TOKENID_++;
        }
    }
}
