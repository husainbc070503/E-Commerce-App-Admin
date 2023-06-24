import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { ChakraProvider } from "@chakra-ui/react";
import SideDrawer from "./SideDrawer";
import styled from "@emotion/styled";
import { ThemeProvider, createTheme } from "@mui/material";
import { teal, yellow } from "@mui/material/colors";
import { useGlobalContext } from "../Context&Reducers/Context";

const Header = styled(Typography)`
  font-size: 20px;
  text-align: center;
  font-weight: bold;

  @media (max-width: 890px) {
    font-size: 15px;
  }
`;

const Navbar = () => {
  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: yellow,
    },
  });

  const { admin } = useGlobalContext();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ChakraProvider>
                {localStorage.getItem("e-comm-admin") ? <SideDrawer /> : ""}
              </ChakraProvider>
            </IconButton>
            <Header variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              E-Commerce App Admin Panel
            </Header>
            <Button variant="contained" color="secondary">
              {localStorage.getItem("e-comm-admin")
                ? `Welcome, ${admin?.name}`
                : "Login"}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;
