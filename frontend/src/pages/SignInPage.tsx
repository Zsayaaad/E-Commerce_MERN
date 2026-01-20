import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        setError("Login failed");
        return;
      }

      const token = await response.json();

      login(email, token);
      navigate("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
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
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h5" fontWeight="bold" align="center">
            Sign In
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component={"form"}
            sx={{
              mt: 1,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Typography align="center">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#0062c4" }}
              >
                Register now
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignInPage;
