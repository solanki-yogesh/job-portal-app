import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJobs } from "./jobsApi";
import { fetchApplications, applyJob } from "../applications/applicationsApi";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";

const CandidateJobs = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.auth);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const { data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  const mutation = useMutation({
    mutationFn: ({ jobId, userId }: { jobId: number; userId: number }) =>
      applyJob(jobId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      setSuccess("Applied successfully!");
    },
    onError: () => {
      setError("Application failed. Please try again.");
    },
  });

  if (jobsLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" mt={4} mb={3} fontWeight="bold">
        Available Jobs
      </Typography>

      {jobs?.length === 0 && (
        <Box display="flex" justifyContent="center" mt={8}>
          <Typography variant="h6" color="text.secondary">
            No jobs available.
          </Typography>
        </Box>
      )}

      {jobs?.map((job) => {
        const alreadyApplied = applications?.some(
          (app) => app.jobId === job.id && app.userId === user?.id
        );
        const isExpired = job.daysRemaining <= 0;
        const isPendingThis = mutation.isPending;

        return (
          <Card key={job.id} sx={{ mb: 3 }} elevation={2}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                flexWrap="wrap"
                gap={1}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {job.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {job.description}
                  </Typography>
                </Box>

                {isExpired ? (
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="error.main"
                  >
                    Expired
                  </Typography>
                ) : alreadyApplied ? (
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="success.main"
                  >
                    ✓ Already Applied
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {job.daysRemaining} day
                    {job.daysRemaining !== 1 ? "s" : ""} remaining
                  </Typography>
                )}
              </Box>

              <Box mt={2}>
                <Button
                  variant="contained"
                  disabled={alreadyApplied || isExpired || isPendingThis}
                  startIcon={
                    isPendingThis && !alreadyApplied && !isExpired ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : undefined
                  }
                  onClick={() =>
                    mutation.mutate({
                      jobId: job.id,
                      userId: user!.id,
                    })
                  }
                >
                  {isPendingThis && !alreadyApplied && !isExpired
                    ? "Applying..."
                    : "Apply"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccess("")}>
          {success}
        </Alert>
      </Snackbar>

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

export default CandidateJobs;