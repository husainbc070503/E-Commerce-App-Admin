import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context&Reducers/Context";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Button, ChakraProvider, FormLabel } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Heading = styled(Typography)`
  font-size: 25px;
  font-weight: bold;
`;

const FormGroup = styled(FormControl)`
  width: 100%;
  margin: 16px 0;
`;

const initialState = {
  name: "",
  isActive: "true",
};

const AddCategory = () => {
  const { addCategory, editingCat, editCat, editCategory } = useGlobalContext();
  const [cat, setCat] = useState(initialState);

  const handleChange = (e) =>
    setCat({ ...cat, [e.target.name]: e.target.value });

  useEffect(() => {
    editingCat ? setCat(editCat) : setCat(initialState);
  }, [editCat]);

  return (
    <Box>
      <Heading> {editingCat ? "Edit" : "Add"} Category</Heading>
      <FormGroup>
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{ fontSize: "20px", marginBottom: "14px" }}
        >
          Name
        </FormLabel>
        <TextField
          type="text"
          name="name"
          variant="outlined"
          label="Name"
          value={cat.name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{ fontSize: "20px", marginBottom: "6px" }}
        >
          Is Active
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="true"
            name="isActive"
            onChange={handleChange}
            control={<Radio />}
            label="True"
          />
          <FormControlLabel
            value="false"
            name="isActive"
            onChange={handleChange}
            control={<Radio />}
            label="False"
          />
        </RadioGroup>
      </FormGroup>
      <ChakraProvider>
        <Button
          colorScheme="teal"
          marginTop={5}
          onClick={() => {
            !editingCat ? addCategory(cat) : editCategory(cat);
            setCat(initialState);
          }}
        >
          {editingCat ? "Edit" : "Add"}
        </Button>
      </ChakraProvider>
    </Box>
  );
};

export default AddCategory;
