import {useEffect} from 'react'
import { Container,Box,Text,Tab,TabList,TabPanel,TabPanels,Tabs } from '@chakra-ui/react'
import Signin from "../components/Authentication/Signin";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";


const Homepage = () => {

  const history = useHistory();
   useEffect(() => {
          const user= JSON.parse(localStorage.getItem("userInfo"));
  
          if (user) history.push("/chats");      //if user is not login it will redirected to login page
   }, [history]);
  
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="14px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          Talk-Of-Town
        </Text>
      </Box> 

      <Box bg="white" w="100%" p={4} color="black" borderRadius="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Sign In</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel> <Signin  />  </TabPanel>
            <TabPanel> <Signup /> </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage
