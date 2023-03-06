// SPDX-License-Identifier: UNLICENSED

// import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";        

import '@openzeppelin/contracts/access/Ownable.sol';

contract RoboPunkNFT is ERC721 , Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUrl;
    address payable public withdrawWallet;
    mapping (address => uint256) public walletMints;

    constructor() payable ERC721("RoboPunks", "RP") { 
        mintPrice = 0.025 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    function setPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseToken(string calldata _baseTokenTokenUrl) external onlyOwner {
        baseTokenUrl = _baseTokenTokenUrl ;
    }

    function tokenUrl(uint256 _tokenId) public view  returns (string memory) {
        require(_exists(_tokenId), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUrl, Strings.toString(_tokenId), '.json'));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance }('');
        require(success, 'widthdraw failed');
    }
    
    function mint(uint256 _quantity) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        require(msg.value == _quantity * mintPrice, 'Wrong mint value');
        require(totalSupply + _quantity <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'exceed max wallet');

        for(uint256 i = 0 ; i < _quantity ; i++ ){
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);

        }
    }

}