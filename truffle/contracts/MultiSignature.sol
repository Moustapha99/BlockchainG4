pragma solidity ^0.8.9;

contract MultiSignature {
    struct Signature {
        bytes32 hash;
        address signer;
        bytes signature;
    }

    Signature[] signatures;
    uint256 minimumSignatures;

    constructor(uint256 _minimumSignatures) public {
        minimumSignatures = _minimumSignatures;
    }

    function addSignature(bytes32 documentHash, address signer, bytes memory signature) public {
        require(signatures.length < minimumSignatures, "Not enough signatures");
        Signature memory s = Signature({
            hash: documentHash,
            signer: signer,
            signature: signature
        });
        signatures.push(s);
    }

    function isSigned() public view returns (bool) {
        return signatures.length >= minimumSignatures;
    }

    function validateTransaction() public {
        require(isSigned(), "Not enough signatures");
        // Do something with the transaction    }
}

}
