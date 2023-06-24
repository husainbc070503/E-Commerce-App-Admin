import React from "react";
import Login from "./Login";
import Register from "./Register";
import {
  Box,
  ChakraProvider,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const Auth = () => {
  return (
    <ChakraProvider>
      <Container maxW="container.sm" centerContent>
        <Heading
          marginTop={"30px"}
          bgClip="text"
          bgGradient="linear(to-l, #F2BE22, #F24C3D)"
        >
          E-Commerce App Admin Panel
        </Heading>
        <Box
          w={"100%"}
          p={3}
          marginTop={"20px"}
          bgGradient="linear(to-b, #fff, #fff, #DDE6ED)"
          borderRadius={"10px"}
        >
          <Tabs variant="soft-rounded" colorScheme="linkedin">
            <TabList>
              <Tab w="50%">Login</Tab>
              <Tab w="50%">Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default Auth;
