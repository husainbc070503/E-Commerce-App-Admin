import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../Context&Reducers/Context";
import { useNavigate } from "react-router-dom";

const ProCard = ({ pro }) => {
  const { name, description, category, company, price, quantity, image, _id } =
    pro;

  const navigate = useNavigate();
  const { deleteProduct } = useGlobalContext();

  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-3">
            {description.substr(0, 200) + "..."}
          </Typography>
          <Grid container spacing={5} alignItems="center">
            <Grid item md={4}>
              <div className="badge bg-success fs-6">{category.name}</div>
            </Grid>
            <Grid item md={4}>
              <div className="badge bg-danger fs-6">{company.name}</div>
            </Grid>
            <Grid item md={4}>
              <div className="badge bg-info fs-6">
                <CurrencyRupeeIcon fontSize="10px" />
                {price}
              </div>
            </Grid>
          </Grid>
          <div className="quantity">
            <Typography variant="span" color="text.secondary">
              Stock Avalaible:
            </Typography>
            <span className="badge bg-warning">{quantity}</span>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <EditIcon
          className="text-success"
          sx={{ fontSize: "22px", cursor: "pointer" }}
          onClick={() => navigate(`editProduct/${_id}`)}
        />
        <DeleteIcon
          className="text-danger"
          sx={{ fontSize: "22px", cursor: "pointer" }}
          onClick={() => deleteProduct(_id)}
        />
      </CardActions>
    </Card>
  );
};

export default ProCard;
