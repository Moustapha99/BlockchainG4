var MultiSignature = artifacts.require("MultiSignature");

contract("MultiSignature", function(accounts) {
    var documentHash = web3.sha3("Test document");
    var signer1 = accounts[1];
    var signer2 = accounts[2];
    var signer3 = accounts[3];

    it("should add signatures", async function() {
        let multiSignature = await MultiSignature.deployed();
        await multiSignature.addSignature(documentHash, signer1, "signature1");
        await multiSignature.addSignature(documentHash, signer2, "signature2");
        let signatures = await multiSignature.signatures(0);
        assert.equal(signatures.hash, documentHash, "hash is incorrect");
        assert.equal(signatures.signer, signer1, "signer is incorrect");
        signatures = await multiSignature.signatures(1);
        assert.equal(signatures.hash, documentHash, "hash is incorrect");
        assert.equal(signatures.signer, signer2, "signer is incorrect");
    });

    it("should validate transaction with enough signatures", async function() {
        let multiSignature = await MultiSignature.deployed();
        await multiSignature.addSignature(documentHash, signer3, "signature3");
        let isSigned = await multiSignature.isSigned();
        assert.equal(isSigned, true, "transaction should be signed");
    });

    it("should not validate transaction with insufficient signatures", async function() {
        let multiSignature = await MultiSignature.deployed();
        try {
            await multiSignature.validateTransaction();
            assert.fail("transaction should not be valid");
        } catch (error) {
            assert.include(error.message, "Not enough signatures", "error message should indicate insufficient signatures");
        }
    });
});
