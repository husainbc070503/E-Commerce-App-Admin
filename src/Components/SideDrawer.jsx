import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { links } from "../Data/Links";
import { Link, useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();

  return (
    <>
      <Button ref={btnRef} colorScheme="black" onClick={onOpen}>
        <i className="fa-solid fa-bars"></i>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight={"bold"}>Links</DrawerHeader>

          <Box padding={"12px 25px"}>
            {links.map((l, index) => {
              return (
                <Text
                  key={index}
                  margin={"10px 0"}
                  fontSize={"xl"}
                  textTransform={"capitalize"}
                >
                  <Link to={l === "products" ? "/" : l}>{l}</Link>
                </Text>
              );
            })}
          </Box>

          <Text
            margin={"10px 24px"}
            cursor="pointer"
            fontSize={"xl"}
            onClick={() => {
              localStorage.removeItem("e-comm-admin");
              navigate('../login')
            }}
          >
            Logout
          </Text>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
