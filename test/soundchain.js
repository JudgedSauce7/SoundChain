const SoundChain = artifacts.require("./SoundChain.sol");

contract("SoundChain", (accounts) => {
  let soundchain;

  before(async () => {
    soundchain = await SoundChain.deployed();
  });

  it("deploys correctly", async () => {
    assert.notEqual(soundchain.address, 0x0);
    assert.notEqual(soundchain.address, undefined);
    assert.notEqual(soundchain.address, null);
    assert.notEqual(soundchain.address, "");
  });

  it("uploads correctly", async () => {
    const result = await soundchain.uploadMedia("random_hash", "title", {
      from: accounts[0],
    });

    console.log(result);

    const count = await soundchain.uploadCount();
    assert.equal(count, 1);

    const UserAddEvent = result.logs[0].args;
    assert.equal(UserAddEvent.id.toNumber(), 1);
    assert.equal(UserAddEvent._address, accounts[0]);

    const MediaUploadedEvent = result.logs[1].args;
    assert.equal(MediaUploadedEvent.id.toNumber(), count.toNumber());
    assert.equal(MediaUploadedEvent.hash_value, "random_hash");
    assert.equal(MediaUploadedEvent.title, "title");
  });

  it("maps user to media", async () => {
    const result = await soundchain.uploadMedia("random_hash2", "title2", {
      from: accounts[0],
    });

    console.log(result);

    const count2 = await soundchain.uploadCount();
    assert.equal(count2, 2);

    const secondUploadEvent = result.logs[0].args;
    assert.equal(secondUploadEvent.id.toNumber(), count2.toNumber());
    assert.equal(secondUploadEvent.hash_value, "random_hash2");
    assert.equal(secondUploadEvent.title, "title2");

    const users = await soundchain.userCount();
    assert.equal(users, 1);
  });
});
