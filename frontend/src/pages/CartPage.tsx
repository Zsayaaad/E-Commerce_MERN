import { useContext } from "react";
import { Box, Container, Grid } from "@mui/material";
import { CartContext } from "../context/Cart/CartContext";

const CartPage = () => {
  // const { cartItems, totalAmount } = useContext(CartContext);
  const { cartItems } = useContext(CartContext);

  return (
    <Container sx={{ mt: 6 }}>
      <Grid container spacing={2} justifyContent="center">
        {(cartItems ?? []).map((item) => (
          <Box key={item.productId}>{item.title}</Box>
        ))}
      </Grid>
    </Container>
  );
};

export default CartPage;
