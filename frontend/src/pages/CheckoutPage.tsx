import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { CartContext } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";

const CheckoutPage = () => {
  const { cartItems, totalAmount, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    // Validate address
    if (!address) {
      setAddressError("Address is required");
      return;
    }

    setAddressError("");

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/cart/checkout`,
      {
        method: "POST",
        body: JSON.stringify({ address }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      return;
    }

    // Clear the cart in frontend context since backend empties it
    clearCart();
    navigate("/order-success");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
          <Typography variant="h6" fontWeight="bold">
            Address
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Address"
            name="address"
            variant="filled"
            error={!!addressError}
            helperText={addressError}
            onChange={(e) => {
              setAddress(e.target.value);
              if (addressError) setAddressError("");
            }}
          ></TextField>
        </Paper>

        <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
          {cartItems.map((item) => (
            <Box
              key={item.productId}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width={400}
            >
              <img src={item.imageUrl} width={120} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography fontWeight={"bold"}>{item.title}</Typography>
                <Typography fontWeight={"bold"}>EGP {item.price}</Typography>
              </Box>
            </Box>
          ))}
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
        >
          <Box>Total Payment</Box>
          <Box>{totalAmount.toFixed(2)} EGP</Box>
        </Paper>
        <Button
          type="submit"
          sx={{ mt: 2, mb: 8, fontWeight: "bold" }}
          variant="contained"
          fullWidth
          onClick={() => handlePlaceOrder()}
        >
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
