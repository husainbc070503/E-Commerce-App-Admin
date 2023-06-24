import React from "react";
import { useGlobalContext } from "../../Context&Reducers/Context";
import { Box, Grid, Typography } from "@mui/material";
import { Badge, ChakraProvider } from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";

const Heading = styled(Typography)`
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const CategoryList = () => {
  const { categories, setEditCat, deleteCategory } = useGlobalContext();

  return (
    <Box>
      <Heading>Categories</Heading>
      <div className="scroll">
        <Grid container sx={{ marginTop: "30px" }}>
          {categories &&
            categories.map((cat) => {
              const { _id, name, isActive } = cat;
              return (
                <Grid
                  key={_id}
                  container
                  sx={{
                    width: "100%",
                    padding: "15px",
                    marginBottom: "30px",
                    boxShadow: "0px 10px 30px #9babb853",
                    borderRadius: "6px",
                  }}
                  alignItems="center"
                >
                  <Grid item md={6} xs={6}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        lineHeight: "2rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {name}
                    </Typography>
                    <ChakraProvider>
                      <Badge colorScheme={isActive ? "green" : "red"}>
                        {isActive ? "Active" : "Inactive"}
                      </Badge>
                    </ChakraProvider>
                  </Grid>
                  <Grid item md={6} xs={6} textAlign="end">
                    <EditIcon
                      sx={{ color: "#22A699", cursor: "pointer" }}
                      onClick={() => setEditCat({ _id, name, isActive })}
                    />
                    <DeleteIcon
                      sx={{ color: "#F24C3D", cursor: "pointer" }}
                      onClick={() => deleteCategory(_id)}
                    />
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </Box>
  );
};

export default CategoryList;
