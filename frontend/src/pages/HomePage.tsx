import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/products`,
        );
        const data: Product[] = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong pls try again.
        </Alert>
      </Stack>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Grid container spacing={2} justifyContent="center">
        {products.map((p) => (
          <Grid key={p._id} size={{ xs: 8, sm: 6, md: 4 }}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
