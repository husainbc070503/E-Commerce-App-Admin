import styled from "@emotion/styled";
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Zoom,
} from "@mui/material";
import React, { useState } from "react";
import "./Product.css";
import { useGlobalContext } from "../../Context&Reducers/Context";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { teal } from "@mui/material/colors";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";

const Heading = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 20px auto;
`;

const Label = styled(FormLabel)`
  font-size: 16px;
  color: #213555;
  margin-bottom: 8px;
`;

const initialState = {
  name: "",
  description: "",
  company: "",
  category: "",
  price: 0.0,
  quantity: "",
  featured: "",
};

const AddProduct = () => {
  const { companies, categories, addProduct } = useGlobalContext();

  const blackTheme = createTheme({
    palette: {
      primary: teal,
    },
  });

  const [pro, setPro] = useState(initialState);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setPro({ ...pro, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error("Please upload image", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only appropriate JPEG or PNG images are accepted!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dztxhls16/image/upload";

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ecommerce_app");
      data.append("cloud", "dztxhls16");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const resp = await res.json();
      if (resp) {
        toast.success("Image Uploaded Successfully.", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setLoading(false);
        setImage(resp.url);
        return;
      } else {
        toast.error("Failed to upload image", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setLoading(false);
        return;
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={blackTheme}>
      <div className="container">
        <Heading>Add Product</Heading>
        <div className="add-form scroll">
          <div className="input-group">
            <FormControl fullWidth>
              <Label>Name</Label>
              <TextField
                variant="outlined"
                name="name"
                placeholder="Type here.."
                focused
                required
                value={pro.name}
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <div className="input-group">
            <FormControl fullWidth>
              <Label>Description</Label>
              <TextField
                variant="outlined"
                placeholder="Type here.."
                multiline
                rows={4}
                name="description"
                required
                value={pro.description}
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <div className="input-group">
                <FormControl fullWidth>
                  <InputLabel id="cat-label">Category</InputLabel>
                  <Select
                    labelId="cat-label"
                    id="cat-autowidth"
                    label="Category"
                    sx={{ textTransform: "capitalize" }}
                    name="category"
                    required
                    value={pro.category}
                    onChange={handleChange}
                  >
                    {categories &&
                      categories.map((cat) => {
                        const { name, _id } = cat;
                        return (
                          <MenuItem
                            key={_id}
                            value={_id}
                            sx={{ textTransform: "capitalize" }}
                          >
                            {name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="input-group">
                <FormControl fullWidth>
                  <InputLabel id="comp-label">Company</InputLabel>
                  <Select
                    labelId="comp-label"
                    id="comp-autowidth"
                    label="Company"
                    name="company"
                    sx={{ textTransform: "capitalize" }}
                    required
                    value={pro.company}
                    onChange={handleChange}
                  >
                    {companies &&
                      companies.map((comp) => {
                        const { name, _id } = comp;
                        return (
                          <MenuItem
                            key={_id}
                            value={_id}
                            sx={{ textTransform: "capitalize" }}
                          >
                            {name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <Label>Price</Label>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CurrencyRupeeIcon />
                  <TextField
                    name="price"
                    placeholder="Type here.."
                    variant="outlined"
                    required
                    sx={{ width: "100%" }}
                    value={pro.price}
                    onChange={handleChange}
                  />
                </Box>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <Label>Quantity Avalaible</Label>
                <TextField
                  name="quantity"
                  placeholder="Type here.."
                  variant="outlined"
                  required
                  value={pro.quantity}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <div className="input-group">
            <FormControl fullWidth>
              <Label>Image</Label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                required
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </FormControl>
          </div>
          <div className="input-group">
            <FormControl>
              <Label>Featured</Label>
              <RadioGroup
                row
                name="featured"
                required
                value={pro.featured}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="true"
                  name="featured"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  name="featured"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="input-group">
            <FormControl>
              <Button
                type="button"
                variant="contained"
                disabled={loading}
                onClick={() => {
                  addProduct(pro, image);
                  setPro(initialState);
                }}
              >
                Add Up
              </Button>
            </FormControl>
          </div>
        </div>
      </div>
      <ToastContainer transition={Zoom} />
    </ThemeProvider>
  );
};

export default AddProduct;
