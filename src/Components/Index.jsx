import React from "react";
import { useGlobalContext } from "../Context&Reducers/Context";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Products from "./Products/Products";

const Add = styled(Link)`
  background: #00ffca;
  color: #0a4d68;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
`;

const Heading = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 20px @media (max-width: 890px) {
    font-size: 19px;
  }
`;

const Index = () => {
  const { categories, dispatch, search } = useGlobalContext();

  const handleSearch = (e) =>
    dispatch({ type: "SET_SEARCH", payload: e.target.value });

  return (
    <div className="container products-container">
      <div className="header">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={6} md={4}>
            <Add variant="contained" to="addProduct">
              Add Product
            </Add>
          </Grid>
          <Grid item xs={6} md={4}>
            <Heading>Products Added</Heading>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="input-group-search">
              <SearchIcon />
              <input
                type="text"
                name="search"
                className="search-field"
                placeholder="Search.."
                value={search}
                onChange={handleSearch}
              />
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="products-lists-container">
        {categories &&
          categories.map((cat) => {
            return (
              <Box key={cat._id} sx={{ marginBottom: "40px" }}>
                <Heading>{cat.name}</Heading>
                <Products cat={cat} />
              </Box>
            );
          })}
      </div>
    </div>
  );
};

export default Index;
