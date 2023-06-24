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
  isProductsAvalaible: "true",
};

const AddCompany = () => {
  const { addCompany, editingComp, editComp, editCompany } = useGlobalContext();

  const [comp, setComp] = useState(initialState);

  const handleChange = (e) =>
    setComp({ ...comp, [e.target.name]: e.target.value });

  useEffect(() => {
    editingComp ? setComp(editComp) : setComp(initialState);
  }, [editComp]);

  return (
    <Box>
      <Heading> {editingComp ? "Edit" : "Add"} Company</Heading>
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
          value={comp.name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{ fontSize: "20px", marginBottom: "6px" }}
        >
          Is Products Avalaible
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="true"
            name="isProductsAvalaible"
            onChange={handleChange}
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            value="false"
            name="isProductsAvalaible"
            onChange={handleChange}
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
      </FormGroup>
      <ChakraProvider>
        <Button
          colorScheme="teal"
          marginTop={5}
          onClick={() => {
            !editingComp ? addCompany(comp) : editCompany(comp);
            setComp(initialState);
          }}
        >
          {editingComp ? "Edit" : "Add"}
        </Button>
      </ChakraProvider>
    </Box>
  );
};

export default AddCompany;
