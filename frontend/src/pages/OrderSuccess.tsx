import { Alert, AlertTitle, Stack } from "@mui/material";

const OrderSuccess = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "20vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
    >
      <Alert
        severity="success"
        sx={{ width: "100%", maxWidth: 800, typography: "h6" }}
      >
        <AlertTitle variant="h5">Success</AlertTitle>
        Your order has been placed successfully!
      </Alert>
    </Stack>
  );
};

export default OrderSuccess;
