import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";

import "./styles.css";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import UpdateGroupModal from "./miscellaneous/UpdateGroup";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

import Lottie from "lottie-react";
import catTyping from "../animation/typing.json";


 
const ENDPOINT = "http://localhost:5001";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(""); 
 const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);


  const toast = useToast();

   useEffect(() => {
     socket = io(ENDPOINT);
     socket.emit("setup", user);
     socket.on("connected", () => setSocketConnected(true));
     socket.on("typing", () => setIsTyping(true));
     socket.on("stop typing", () => setIsTyping(false));
   }, []);

  

useEffect(() => {
  socket.on("message recieved", (newMessageRecieved) => {
    if (
      !selectedChatCompare || // if chat is not selected or doesn't match current chat give notifiaction
      selectedChatCompare._id !== newMessageRecieved.chat._id
    ) {
      if (!notification.includes(newMessageRecieved)) {
        setNotification([newMessageRecieved, ...notification]);
        setFetchAgain(!fetchAgain);
      }
    } else {
      setMessages([...messages, newMessageRecieved]);
    }
  });
});
  


  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true)
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      //console.log(messages);
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
       toast({
         title: "Error Occured!",
         description: "Failed to Load the Messages",
         status: "error",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
    }
  };

  useEffect(() => {
     fetchMessages();
     selectedChatCompare = selectedChat;
  },[selectedChat])


  const sendMessage = async(event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit('stop typing', selectedChat._id);
  try {
     const config = {
       headers: {
         "Content-type": "application/json",
         Authorization: `Bearer ${user.token}`,
       },
     };
       setNewMessage("");
    const { data } = await axios.post(
      "/api/message",
      {
        content: newMessage,
        chatId: selectedChat,
      },
      config 
    );
   // console.log(data);
    socket.emit("new message", data);
    setMessages([...messages, data]);
  } catch (error) {
       toast({
         title: "Error Occured!",
         description: "Failed to send the Message",
         status: "error",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
  }
  }
  }; 


  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //typing indicator logic
     if (!socketConnected) return;

     if (!typing) {
       setTyping(true);
       socket.emit("typing", selectedChat._id);
     }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTime;
          if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat._id);
            setTyping(false);
          }
        }, timerLength);
  }; 

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                </>
              ))}
          </Text>

          <Box
            display="flex"
            flexDir="column" // Stack children vertically
            justifyContent="flex-end" // This helps push content to the bottom
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%" // Ensure this box takes full height of its parent
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={3}>


              {istyping && (
                <div
                  style={{
                    width: "70px",
                    marginLeft: "0px",
                    marginBottom:"15px"
                  }}
                >
                  <Lottie animationData={catTyping} loop={true} />
                </div>
              )}

              <Input
                variant="filled"
                bg="#E0E0E0"
                border="2px groove white" // Sets a 2px solid red border
                borderRadius="md" // Optional: for rounded corners
                _hover={{ borderColor: "blue.400" }}
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                //  onKeyDown={sendMessage} // fixed: moved here
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          bg="#E8E8E8"
          w="100%"
          borderRadius="lg"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat; 