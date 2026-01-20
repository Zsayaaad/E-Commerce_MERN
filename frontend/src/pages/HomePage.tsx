import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  imageUrl: string;
  price: number;
  title: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/products`
        );
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <Box>Someting went wrong pls try again</Box>;
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
