import React from "react";
import { Box, Grid } from "@mui/material";
import AddCompany from "./AddCompany";
import CompaniesList from "./CompaniesList";

const CompaniesIndex = () => {
  return (
    <div className="container">
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <AddCompany />
        </Grid>
        <Grid item md={6} xs={12}>
          <CompaniesList />
        </Grid>
      </Grid>
    </div>
  );
};

export default CompaniesIndex;
