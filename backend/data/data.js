const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "Alice Smith",
        email: "alice@example.com",
      },
      {
        name: "Rohan",
        email: "rohan@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd5",
    chatName: "Alice Smith",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Bob Johnson",
        email: "bob@example.com",
      },
      {
        name: "Rohan",
        email: "rohan@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd5",
    chatName: "Bob Johnson",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Charlie Patel",
        email: "charlie@example.com",
      },
      {
        name: "Rohan",
        email: "rohan@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd5",
    chatName: "Charlie Patel",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Alice Smith",
        email: "alice@example.com",
      },
      {
        name: "Rohan",
        email: "rohan@example.com",
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
      },
    ],
    _id: "617a518c4081150716472c79",
    chatName: "Dev Team",
    groupAdmin: {
      name: "Bob Johnson",
      email: "bob@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Emma Watson",
        email: "emma@example.com",
      },
      {
        name: "Rohan",
        email: "rohan@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd5",
    chatName: "Emma Watson",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Charlie Patel",
        email: "charlie@example.com",
      },
      {
        name: "Emma Watson",
        email: "emma@example.com",
      },
      {
        name: "Rohan",
        email: "rohan@example.com",
      },
    ],
    _id: "617a518c4081150016472c79",
    chatName: "Study Group",
    groupAdmin: {
      name: "Emma Watson",
      email: "emma@example.com",
    },
  },
];

module.exports = { chats };
