import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "./jobsApi";

interface FormState {
  title: string;
  description: string;
  daysRemaining: number;
}

interface FormErrors {
  title?: string;
  description?: string;
  daysRemaining?: string;
}

const initialForm: FormState = {
  title: "",
  description: "",
  daysRemaining: 0,
};

const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!form.title.trim()) errors.title = "Title is required.";
  if (!form.description.trim()) errors.description = "Description is required.";
  if (form.daysRemaining <= 0)
    errors.daysRemaining = "Days remaining must be greater than 0.";
  return errors;
};

const CreateJob = () => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setForm(initialForm);
      setErrors({});
      setShowSuccess(true);
    },
  });

  const handleSubmit = () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    mutation.mutate(form);
  };

  const handleChange =
    <K extends keyof FormState>(field: K) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value =
          field === "daysRemaining" ? Number(e.target.value) : e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      };

  return (
    <>
      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Create Job
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            value={form.title}
            onChange={handleChange("title")}
            error={!!errors.title}
            helperText={errors.title}
          />

          <TextField
            label="Description"
            multiline
            minRows={3}
            value={form.description}
            onChange={handleChange("description")}
            error={!!errors.description}
            helperText={errors.description}
          />

          <TextField
            type="number"
            label="Days Remaining"
            value={form.daysRemaining}
            onChange={handleChange("daysRemaining")}
            error={!!errors.daysRemaining}
            helperText={errors.daysRemaining}
            inputProps={{ min: 1 }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={mutation.isPending}
            startIcon={
              mutation.isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : undefined
            }
          >
            {mutation.isPending ? "Creating..." : "Create Job"}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Job created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateJob;