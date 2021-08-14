pragma solidity >=0.4.20;

contract ethmessenger {
    event messageSentEvent(address indexed from, address indexed to, bytes message, bytes32 encryption);
    event addressJoinEvent(address indexed from);
    

    struct Member {
        bytes32 publicKeyLeft;
        bytes32 publicKeyRight;
        bytes32 name;
        bytes32 avatarUrl;
        uint messageStartBlock;
        bool isMember;
    }
    
    mapping (address => Member) public members;

    function join(bytes32 publicKeyLeft, bytes32 publicKeyRight) public {
        require(members[msg.sender].isMember == false);
        
        Member memory newMember = Member(publicKeyLeft, publicKeyRight, "", "", 0, true);
        members[msg.sender] = newMember;

        emit addressJoinEvent(msg.sender);
    }
    
    function sendMessage(address to, bytes memory message, bytes32 encryption) public onlyMember {

        if (members[to].messageStartBlock == 0) {
            members[to].messageStartBlock = block.number;
        }
        
        emit messageSentEvent(msg.sender, to, message, encryption);
    }
    
    modifier onlyMember() {
        require(members[msg.sender].isMember == true);
        _;
    }
    

}
