import styled from "@emotion/styled";
import {
  Badge,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  Zoom,
  createTheme,
} from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../Context&Reducers/Context";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { teal } from "@mui/material/colors";
import { url } from "../../Api";
import { ToastContainer, toast } from "react-toastify";

const Heading = styled(Typography)`
  font-size: 25px;
  margin: 20px 0;
  color: #080202;
`;

const Headers = styled(TableCell)`
  font-size: 18px;
  font-weight: bold;
`;

const Title = styled(Typography)`
  font-weight: bold;
`;

const Orders = () => {
  const { orders } = useGlobalContext();

  const theme = createTheme({
    palette: {
      primary: teal,
    },
  });

  const handleChange = async (id, value) => {
    try {
      const res = await fetch(`${url}/api/order/updateOrder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isDelivered: value }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Updated!! Please refresh to see change", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container order-container">
        <div className="header">
          <Heading>Orders</Heading>
        </div>
        {orders.length === 0 ? (
          <Typography>No Orders</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <Headers align="start">Sr.No.</Headers>
                  <Headers align="start" width={450}>
                    User
                  </Headers>
                  <Headers align="start">Products</Headers>
                  <Headers align="start">Total Price</Headers>
                  <Headers align="left">Delivered</Headers>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders.map((o, index) => {
                    const {
                      _id,
                      totalPrice,
                      user: { name, phone, address, email },
                      products,
                      userQuantity,
                      isDelivered,
                    } = o;

                    return (
                      <TableRow
                        key={o._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="start">{index + 1}</TableCell>
                        <TableCell>
                          <Grid
                            container
                            spacing={2}
                            sx={{ marginBottom: "10px" }}
                          >
                            <Grid item md={4}>
                              <Title>Name</Title>
                            </Grid>
                            <Grid item md={8}>
                              <Typography>{name}</Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            sx={{ marginBottom: "10px" }}
                          >
                            <Grid item md={4}>
                              <Title>Phone No.</Title>
                            </Grid>
                            <Grid item md={8}>
                              <Typography>{phone}</Typography>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item md={4}>
                              <Title>Address</Title>
                            </Grid>
                            <Grid item md={8}>
                              <Typography sx={{ textAlign: "justify" }}>
                                {address}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell align="start">
                          {products.map((pro, ind) => (
                            <Typography sx={{ fontSize: "18px" }}>
                              {pro.name}
                              <span
                                style={{
                                  color: "#526D82",
                                  fontSize: "16px",
                                  marginLeft: "5px",
                                }}
                              >
                                (Q: {userQuantity[ind] ? userQuantity[ind] : 1})
                              </span>
                            </Typography>
                          ))}
                        </TableCell>
                        <TableCell align="start">
                          <Heading>
                            <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
                            {totalPrice}
                          </Heading>
                        </TableCell>
                        <TableCell align="start">
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="delivered"
                            onChange={(e) => handleChange(_id, e.target.value)}
                            value={isDelivered}
                          >
                            <FormControlLabel
                              value="true"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="false"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <ToastContainer transition={Zoom} />
      </div>
    </ThemeProvider>
  );
};

export default Orders;
