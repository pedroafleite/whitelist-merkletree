const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

let whitelistAddresses = [
    "0X5B38DA6A701C568545DCFCB03FCB875F56BEDDC4",
    "0X5A641E5FB72A2FD9137312E7694D42996D689D99",
    "0XDCAB482177A592E424D1C8318A464FC922E8DE40",
    "0X6E21D37E07A6F7E53C7ACE372CEC63D4AE4B6BD0",
    "0X09BAAB19FC77C19898140DADD30C4685C597620B",
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4" // The address in remix
  ];

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});

const rootHash = merkleTree.getRoot();
console.log('Whitelist Merkle Tree\n', merkleTree.toString());
console.log("Root Hash: ", rootHash);

const claimingAddress = leafNodes[6];

const hexProof = merkleTree.getHexProof(claimingAddress);
console.log(hexProof);

console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));
