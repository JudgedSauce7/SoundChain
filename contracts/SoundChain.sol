pragma solidity >=0.4.21 <0.7.0;

contract SoundChain {
    string public name = "SoundChain";

    uint256 public uploadCount = 0;
    uint256 public userCount = 0;

    mapping(uint256 => Media) public uploads;
    mapping(address => User) public users;

    struct Media {
        uint256 id;
        string hash_value;
        string title;
        uint256 likes;
        uint256 tipsCollected;
        uint256 buyCount;
        address payable artist;
        uint256 price;
    }

    struct User {
        uint256 id;
        uint256[] liked;
        uint256[] uploads;
        uint256[] bought;
        uint256 amountTipped;
        uint256 tipsReceived;
        uint256 amountEarned;
        uint256 amountSpent;
        address _address;
    }

    event UserAdded(uint256 id, address _address);

    function addNewUser(address _address) public {
        userCount += 1;
        User memory newUser;
        newUser.id = userCount;
        newUser._address = _address;
        users[_address] = newUser;

        emit UserAdded(userCount, _address);
    }

    function tipMedia(uint256 _id) public payable {
        require(_id <= uploadCount, "Invalid Request");
        Media memory _media = uploads[_id];
        address payable _artist = _media.artist;

        require(_artist != address(0x0), "Invalid Request");
        require(users[_artist].id != 0, "Artist doesn't exist");

        _artist.transfer(msg.value);

        _media.tipsCollected += msg.value;
        uploads[_id] = _media;

        User memory artist = users[_artist];
        artist.tipsReceived += msg.value;
        users[_artist] = artist;

        User memory tipper = users[msg.sender];
        if (tipper.id == 0) {
            addNewUser(msg.sender);
            tipper = users[msg.sender];
        }
        tipper.amountTipped += msg.value;
        users[msg.sender] = tipper;
    }

    function likeMedia(uint256 _id) public {
        require(_id <= uploadCount, "Invalid request");
        Media memory _media = uploads[_id];
        _media.likes++;
        uploads[_id] = _media;
        users[msg.sender].liked.push(_id);
    }

    event MediaUploaded(
        uint256 id,
        string hash_value,
        string title,
        address payable artist
    );

    function uploadMedia(
        string memory _hash,
        string memory _title,
        uint256 _price
    ) public {
        require(bytes(_hash).length > 0, "File doesn't exist");
        require(bytes(_title).length > 0, "File should have a title");
        require(msg.sender != address(0x0));

        uploadCount += 1;
        Media memory newUpload;
        newUpload.hash_value = _hash;
        newUpload.title = _title;
        newUpload.artist = msg.sender;
        newUpload.price = _price;
        uploads[uploadCount] = newUpload;

        User memory artist = users[msg.sender];
        if (artist.id == 0) {
            addNewUser(msg.sender);
            artist = users[msg.sender];
        }
        users[msg.sender].uploads.push(uploadCount);

        emit MediaUploaded(uploadCount, _hash, _title, msg.sender);
    }

    function buyMedia(uint256 _id) public payable {
        require(_id <= uploadCount, "Invalid request");
        Media memory _media = uploads[_id];
        address payable _artist = _media.artist;

        require(_artist != address(0x0), "Invalid Request");
        require(users[_artist].id != 0, "Artist doesn't exist");

        _artist.transfer(msg.value);

        _media.buyCount++;
        uploads[_id] = _media;

        User memory artist = users[_artist];
        artist.amountEarned += msg.value;
        users[_artist] = artist;

        User memory buyer = users[msg.sender];
        if (buyer.id == 0) {
            addNewUser(msg.sender);
            buyer = users[msg.sender];
        }
        buyer.amountSpent += msg.value;
        users[msg.sender] = buyer;

        users[msg.sender].bought.push(_id);
    }

    function getUploads(address _address)
        public
        view
        returns (uint256[] memory)
    {
        return users[_address].uploads;
    }

    function getBought(address _address)
        public
        view
        returns (uint256[] memory)
    {
        return users[_address].bought;
    }

    function getLiked(address _address) public view returns (uint256[] memory) {
        return users[_address].liked;
    }
}
