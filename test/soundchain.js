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
    const result = await soundchain.uploadMedia(
      "random_hash",
      "title",
      1000000000000000,
      {
        from: accounts[0],
      }
    );

    console.log(result);

    const count = await soundchain.uploadCount();
    assert.equal(count, 1);

    const UserAddEvent = result.logs[0].args;
    assert.equal(UserAddEvent.id.toNumber(), count.toNumber());
    assert.equal(UserAddEvent._address, accounts[0]);

    const MediaUploadedEvent = result.logs[1].args;
    assert.equal(MediaUploadedEvent.id.toNumber(), count.toNumber());
    assert.equal(MediaUploadedEvent.hash_value, "random_hash");
    assert.equal(MediaUploadedEvent.title, "title");

    const userUpload = await soundchain.getUploads(accounts[0]);
    assert.equal(userUpload.length, 1);
    assert.equal(userUpload[0], 1);
  });

  it("maps user to media", async () => {
    const result = await soundchain.uploadMedia(
      "random_hash2",
      "title2",
      2000000000000000,
      {
        from: accounts[0],
      }
    );

    console.log(result);

    const count2 = await soundchain.uploadCount();
    assert.equal(count2, 2);

    const secondUploadEvent = result.logs[0].args;
    assert.equal(secondUploadEvent.id.toNumber(), count2.toNumber());
    assert.equal(secondUploadEvent.hash_value, "random_hash2");
    assert.equal(secondUploadEvent.title, "title2");

    const users = await soundchain.userCount();
    assert.equal(users, 1);

    const userUpload = await soundchain.getUploads(accounts[0]);
    assert.equal(userUpload.length, 2);
    assert.equal(userUpload[1], 2);
  });

  it("tips correctly", async () => {
    const tipAmount = 100000000000000;
    await soundchain.tipMedia(1, { from: accounts[1], value: tipAmount });
    const users = await soundchain.userCount();
    assert.equal(users, 2);

    const artist = await soundchain.users(accounts[0]);
    const tipper = await soundchain.users(accounts[1]);
    assert.equal(artist.tipsReceived.toNumber(), tipAmount);
    assert.equal(tipper.amountTipped.toNumber(), tipAmount);
  });

  it("buys correctly", async () => {
    const upload = await soundchain.uploads(1);
    await soundchain.buyMedia(1, {
      from: accounts[1],
      value: upload.price.toNumber(),
    });
    const users = await soundchain.userCount();
    assert.equal(users, 2);

    const artist = await soundchain.users(accounts[0]);
    const buyer = await soundchain.users(accounts[1]);

    assert.equal(artist.amountEarned.toNumber(), upload.price.toNumber());
    assert.equal(buyer.amountSpent.toNumber(), upload.price.toNumber());

    const bought = await soundchain.getBought(accounts[1]);
    assert.equal(bought.length, 1);
    assert.equal(bought[0], 1);
  });

  it("likes correctly", async () => {
    await soundchain.likeMedia(1, { from: accounts[1] });
    const liked = await soundchain.getLiked(accounts[1]);
    assert.equal(liked.length, 1);
    assert.equal(liked[0], 1);

    const media = await soundchain.uploads(1);
    assert.equal(media.likes, 1);
  });
});
