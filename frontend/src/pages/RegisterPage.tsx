import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        {
          method: "POST",
          body: JSON.stringify({ firstName, lastName, email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        setError("This email is already exist!, Try different credentials.");
        return;
      }

      const token = await response.json();

      login(firstName, token);
      navigate("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occured");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography fontSize="1.1875rem" fontWeight="bold" align="center">
            Get started with ELECTRONICS
          </Typography>

            {error && <Alert severity="error">{error}</Alert>}

          <Box
            component={"form"}
            sx={{
              mt: 1,
            }}
          >
            <TextField
              inputRef={firstNameRef}
              margin="normal"
              required
              fullWidth
              label="First name"
              name="firstName"
            />
            <TextField
              inputRef={lastNameRef}
              margin="normal"
              required
              fullWidth
              label="Last name"
              name="lastName"
            />
            <TextField
              inputRef={emailRef}
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
            />
            <TextField
              inputRef={passwordRef}
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
            />
            <Button
              onClick={onSubmit}
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
