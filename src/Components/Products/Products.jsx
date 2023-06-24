import { Grid } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../Context&Reducers/Context";
import ProCard from "./ProCard";

const Products = ({ cat }) => {
  const { products } = useGlobalContext();
  return (
    <Grid container spacing={6}>
      {products &&
        products.map((pro) => {
          return pro.category.name === cat.name ? (
            <Grid key={pro._id} item md={4} xs={12}>
              <ProCard pro={pro} />
            </Grid>
          ) : (
            ""
          );
        })}
    </Grid>
  );
};

export default Products;
