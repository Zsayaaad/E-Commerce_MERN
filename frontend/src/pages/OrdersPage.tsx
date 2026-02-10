import { Box, Container, Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth/AuthContext";

const OrdersPage = () => {
  const { orders, getOrders } = useContext(AuthContext);

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Typography variant="h5" fontWeight="bold" mt={4}>
        Orders
      </Typography>
      <Box maxWidth="lg" display="flex" flexDirection="column" gap={2} mt={2}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography fontWeight="bold" mb={3}>
            Completed
          </Typography>
          {orders.map((order) => (
            <Paper
              elevation={1}
              sx={{ padding: 2, marginBottom: 2 }}
              key={order._id}
            >
              <Box
                key={order._id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
              >
                {order.orderItems.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap={2}
                  >
                    <img
                      src={item.productImage}
                      style={{ width: "50px", height: "50px" }}
                    />
                    <Box>
                      <Typography>{item.productTitle}</Typography>
                      <Typography>Quantity: {item.productQuantity}</Typography>
                      <Typography>Price: EGP {item.productPrice}</Typography>
                    </Box>
                  </Box>
                ))}
                <Box>
                  <Typography>Total: EGP {order.total}</Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Paper>
      </Box>
    </Container>
  );
};

export default OrdersPage;
