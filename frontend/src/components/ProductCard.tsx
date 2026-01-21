import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { CartContext } from "../context/Cart/CartContext";

interface Props {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
}

export default function ProductCard({ _id, title, imageUrl, price }: Props) {

  const {addItemToCart} = useContext(CartContext)

  return (
    <Card>
      <CardMedia sx={{ height: 300 }} image={imageUrl} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={() => addItemToCart(_id)}>
          Add to card
        </Button>
      </CardActions>
    </Card>
  );
}
