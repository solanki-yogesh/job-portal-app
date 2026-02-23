import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchApplicationsByJob } from "../applications/applicationsApi";
import { fetchUsers } from "../users/usersApi";

interface Props {
  open: boolean;
  onClose: () => void;
  jobId: number;
}

const ApplicantsDialog = ({ open, onClose, jobId }: Props) => {
  const { data: applications, isLoading: isAppsLoading } = useQuery({
    queryKey: ["applications", jobId],
    queryFn: () => fetchApplicationsByJob(jobId),
    enabled: open,
  });

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: open,
  });

  const isLoading = isAppsLoading || isUsersLoading;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Applicants</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <List disablePadding>
            {applications?.length === 0 && (
              <Typography color="text.secondary" py={2}>
                No applicants yet.
              </Typography>
            )}
            {applications?.map((app) => {
              const user = users?.find((u) => u.id === app.userId);
              return (
                <ListItem key={app.id} divider>
                  <Box sx={{ py: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {user?.name ?? "Unknown"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email ?? "Unknown"}
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                      Applied On: {new Date(app.appliedDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantsDialog;