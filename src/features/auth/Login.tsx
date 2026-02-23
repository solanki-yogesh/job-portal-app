import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { loginSuccess } from "./authSlice";
import { axiosInstance } from "../../api/axiosInstance";
import type { User } from "../../types";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Admin login (hardcoded credentials)
    if (email === "admin@test.com" && password === "admin123") {
      dispatch(
        loginSuccess({
          id: 0,
          email,
          role: "admin",
          name: "Admin",
        })
      );
      navigate("/admin");
      return;
    }

    try {
      const res = await axiosInstance.get<User[]>(
        `/users?email=${email}&password=${password}`
      );

      if (res.data.length > 0) {
        const { password: _pwd, ...safeUser } = res.data[0];
        dispatch(loginSuccess(safeUser));
        navigate("/jobs");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => navigate("/register")}
        >
          Register as Candidate
        </Button>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;