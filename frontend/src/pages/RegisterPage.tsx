import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      setError("This email is already exist!, Try different credentials.");
      return;
    }
    
    const data = await response.json();
    
    console.log(data); // token of the user
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" fontSize="1.1875rem" fontWeight="bold">
          Get started with ELECTRONICS
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 3,
            boxShadow: 3,
            borderRadius: 4,
            padding: 4,
            width: "400px",
          }}
        >
          <TextField
            inputRef={firstNameRef}
            label="First name"
            name="firstName"
          />
          <TextField inputRef={lastNameRef} label="Last name" name="lastName" />
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            inputRef={passwordRef}
            label="Password"
            type="password"
            name="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Continue
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
