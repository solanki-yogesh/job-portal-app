import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "./jobsApi";
import { fetchApplications } from "../applications/applicationsApi";
import CreateJob from "./CreateJob";
import { useState } from "react";
import ApplicantsDialog from "./ApplicantsDialog";

const AdminJobs = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const { data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" mt={4} mb={3} fontWeight="bold">
        Admin Panel
      </Typography>

      <CreateJob />

      {jobs?.map((job) => {
        const applicantCount =
          applications?.filter((a) => a.jobId === job.id).length ?? 0;

        return (
          <Card key={job.id} sx={{ mb: 2 }} elevation={2}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={1}
              >
                <Box>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Days Remaining: {job.daysRemaining}
                  </Typography>
                  <Typography variant="body2">
                    Applicants: {applicantCount}
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => setSelectedJob(job.id)}
                >
                  View Applicants
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}

      {selectedJob !== null && (
        <ApplicantsDialog
          open={true}
          onClose={() => setSelectedJob(null)}
          jobId={selectedJob}
        />
      )}
    </Container>
  );
};

export default AdminJobs;