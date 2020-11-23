pragma solidity >=0.4.21 <0.7.0;

contract SoundChain {
    string public name = "SoundChain";

    uint256 public uploadCount = 0;
    uint256 public userCount = 0;

    mapping(uint256 => Media) public uploads;
    mapping(address => User) public users;

    struct Media {
        string hash_value;
        string title;
        uint256 likes;
        address payable artist;
    }

    struct User {
        uint256 id;
        uint256[] uploads;
        uint256[] bought;
        uint256 amountTipped;
        uint256 tipsRecieved;
    }

    event UserAdded(uint256 id, address _address);

    function addNewUser(address _address) public {
        userCount += 1;
        User memory newUser;
        newUser.id = userCount;
        users[_address] = newUser;

        emit UserAdded(userCount, _address);
    }

    function tipMedia(uint256 _id) public payable {
        require(_id < uploadCount, "Invalid Request");
        Media memory _media = uploads[_id];
        address payable _artist = _media.artist;

        require(_artist != address(0x0), "Invalid Request");
        require(users[_artist].id != 0, "Artist doesn't exist");
        _artist.transfer(msg.value);

        User memory artist = users[_artist];
        artist.tipsRecieved += msg.value;
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
        require(_id < uploadCount, "Invalid request");
        Media memory _media = uploads[_id];
        _media.likes++;
        uploads[_id] = _media;
    }

    event MediaUploaded(
        uint256 id,
        string hash_value,
        string title,
        address payable artist
    );

    function uploadMedia(string memory _hash, string memory _title) public {
        require(bytes(_hash).length > 0, "File doesn't exist");
        require(bytes(_title).length > 0, "File should have a title");
        require(msg.sender != address(0x0));

        uploadCount += 1;
        uploads[uploadCount] = Media(_hash, _title, 0, msg.sender);

        User memory artist = users[msg.sender];
        if (artist.id == 0) {
            addNewUser(msg.sender);
            artist = users[msg.sender];
        }
        users[msg.sender].uploads.push(uploadCount);

        emit MediaUploaded(uploadCount, _hash, _title, msg.sender);
    }
}
