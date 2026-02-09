import { useContext, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CartContext } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import * as React from "react";
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CartPage = () => {
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);

  const {
    cartItems,
    totalAmount,
    updateQuantityOfCartItem,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  const handleQuantity = (
    productId: string,
    quantity: number,
    stock: number,
  ) => {
    setError("");
    if (quantity < 1) {
      return;
    }

    if (quantity > stock) {
      setError("Insufficient stock for the product");
      return;
    }
    updateQuantityOfCartItem(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    setError("");
    removeItem(productId);
  };

  const handleClearCart = () => {
    clearCart();
    setOpen(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const renderCartItems = () => (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          variant="contained"
          onClick={() => handleClearCart()}
          sx={{
            fontSize: "0.6rem",
            mb: 3,
          }}
        >
          Clear Cart
        </Button>
      </Box>

      {(cartItems ?? []).map((item) => (
        <Paper elevation={3} sx={{ p: 2, width: "100%", mb: 2 }}>
          <Box
            key={item.productId}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <img src={item.imageUrl} width={120} />

              <Typography fontWeight="bold">{item.title}</Typography>
              <ButtonGroup size="small" aria-label="Small button group">
                <Button
                  sx={{ fontWeight: "bold" }}
                  onClick={() =>
                    handleQuantity(
                      item.productId,
                      item.quantity + 1,
                      item.stock,
                    )
                  }
                >
                  +
                </Button>
                <Button
                  sx={{ fontWeight: "bold" }}
                  onClick={() =>
                    handleQuantity(
                      item.productId,
                      item.quantity - 1,
                      item.stock,
                    )
                  }
                >
                  -
                </Button>
              </ButtonGroup>
            </Box>
            <ButtonGroup size="small" aria-label="Small button group">
              <Button
                sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                onClick={() => handleRemoveItem(item.productId)}
              >
                Remove Item
              </Button>
            </ButtonGroup>

            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography fontWeight="bold" margin={2}>
                {item.price} x {item.quantity} EGP
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
      <Typography
        fontWeight="bold"
        variant="h6"
        display={"flex"}
        justifyContent={"center"}
        m={5}
      >
        Total = {totalAmount} EGP
      </Typography>
    </Box>
  );

  return (
    <Container
      sx={{
        mt: 6,
        width: 800,
      }}
    >
      <Stack direction="row" spacing={1}>
        <Chip
          label="My Cart"
          variant="filled"
          sx={{
            fontSize: "2.125rem",
            padding: "15px 15px",
            height: "auto",
          }}
        />
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      {cartItems.length ? (
        renderCartItems()
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Now Cart Is Empty, You can go and shop again"
          action={action}
        />
      )}
    </Container>
  );
};

export default CartPage;
