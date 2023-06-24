import { Box, Grid } from "@mui/material";
import React from "react";
import AddCategory from "./AddCategory";
import CategoryList from "./CategoryList";

const CategoriesIndex = () => {
  return (
    <div className="container">
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <AddCategory />
        </Grid>
        <Grid item md={6} xs={12}>
          <CategoryList />
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoriesIndex;
