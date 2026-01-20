import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { Container, Grid } from "@mui/material";

const CartPage = () => {
  const [cart, setCart] = useState("");
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Failed to fetch user cart. Try again");
          return;
        }

        const data = await response.json();

        setCart(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };

    fetchCart();
  }, [token]);

  return (
    <Container sx={{ mt: 6 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* {cart.items.map((c) => (
          <Grid key={c._id} size={{ xs: 8, sm: 6, md: 4 }}>
            <{...c} />
          </Grid>
        ))} */}
      </Grid>
    </Container>
  );
};

export default CartPage;
