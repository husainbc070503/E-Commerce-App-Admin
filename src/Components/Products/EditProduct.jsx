import { theme } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Button,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context&Reducers/Context";
import "./Product.css";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../Api";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

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

const EditProduct = () => {
  const blackTheme = createTheme({
    palette: {
      primary: teal,
    },
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [others, setOthers] = useState({
    image: "",
    category: "",
    company: "",
    featured: false,
  });
  const [editPro, setEditPro] = useState({});
  const [loading, setLoading] = useState(false);

  const { categories, companies, editProduct } = useGlobalContext();

  const fetchProduct = async () => {
    const res = await fetch(`${url}/api/product/getProduct/${id}`);
    const data = await res.json();
    setEditPro(data.pro);
    setOthers({
      image: data.pro.image,
      category: data.pro.category._id,
      company: data.pro.company._id,
      featured: data.pro.featured,
    });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) =>
    setEditPro({ ...editPro, [e.target.name]: e.target.value });

  const handleOthers = (e) =>
    setOthers({ ...others, [e.target.name]: e.target.value });

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
        toast.success("Image Updated Successfully.", {
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
        setOthers({ ...others, image: resp.url });
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
        <Heading>Editing Product</Heading>
        <div className="image">
          <img src={others.image} className="img" />
          <label htmlFor="editImage">
            <div className="icon">
              <EditIcon />
            </div>
          </label>
          <input
            type="file"
            id="editImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleUpload(e.target.files[0])}
          />
        </div>
        <div className="edit-form scroll">
          <div className="input-group">
            <FormControl fullWidth>
              <Label>Name</Label>
              <TextField
                variant="outlined"
                name="name"
                placeholder="Type here.."
                focused
                required
                value={editPro.name}
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
                value={editPro.description}
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
                    value={others.category}
                    onChange={handleOthers}
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
                    value={others.company}
                    onChange={handleOthers}
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
                    value={editPro.price}
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
                  value={editPro.quantity}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <div className="input-group">
            <FormControl>
              <Label>Featured</Label>
              <RadioGroup
                row
                name="featured"
                required
                value={others.featured}
                onChange={handleOthers}
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
            <Button
              type="button"
              variant="contained"
              disabled={loading}
              onClick={() => editProduct({ ...editPro, ...others }, id)}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() => navigate("/")}
              style={{ background: "#F9F54B", color: "#191919" }}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EditProduct;
