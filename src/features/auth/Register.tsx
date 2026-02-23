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
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../api/axiosInstance";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.post("/users", {
        ...form,
        role: "candidate",
      });
    },
    onSuccess: () => {
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/"), 1500);
    },
    onError: () => {
      setError("Registration failed");
    },
  });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields required");
      return;
    }

    mutation.mutate();
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4">Register</Typography>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Registering..." : "Register"}
        </Button>
      </Box>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;