// SPDX-Licence-Identifier: MIT
pragma solidity >=0.8.7 <0.8.12;

interface ICollectible {
    function pause() public;
    function unpause() public;
    function setContractURI(string memory _contractURI) public;
    function safeMint(address _to, string memory _tokenURI) public;
    function setTokenURI(uint256 _tokenId, string memory _tokenURI) public;
    function setDefaultRoyalty(address _receiver, uint96 _feeNumerator) public;
    function setTokenRoyalty(uint256 _tokenId, address _receiver, uint96 _feeNumerator) public;
    function deleteDefaultRoyalty() public;
    function resetTokenRoyalty(uint96 _tokenId) public;    
}
