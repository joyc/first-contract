const MintableERC721 = artifacts.require("MintableERC721");

contract("MintableERC721", accounts => {

    it("MintNFT", async() => {
        const instance = await MintableERC721.deployed();
        
        const name = await instance.name.call();
        assert.equal(name, "Mintable NFT");

        let receivers = [
            accounts[1],
            accounts[1],
            accounts[2],
            accounts[3],
        ]
        
        let uris = [
            "https://ipfs.io/ipfs/QmNfCWVmEvD8RZthdtru93PW8J3LdHtm3S41BuEqFFd6oh",
            "https://ipfs.io/ipfs/QmNfCWVmEvD8RZthdtru93PW8J3LdHtm3S41BuEqFFd6oh",
            "https://ipfs.io/ipfs/QmNfCWVmEvD8RZthdtru93PW8J3LdHtm3S41BuEqFFd6oh",
            "https://ipfs.io/ipfs/QmNfCWVmEvD8RZthdtru93PW8J3LdHtm3S41BuEqFFd6oh",
        ]

        await instance.mint(receivers, uris);

        const account_one_balance = await instance.balanceOf.call(accounts[1]);
        assert.equal(account_one_balance.toNumber(), 2);

        const owner_of_two = await instance.ownerOf.call(2);
        assert.equal(owner_of_two, accounts[2]);

        const nextTokenId = await instance._CUR_TOKENID_.call();
        assert.equal(nextTokenId.toNumber(), 4);
    });
})