import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Chip,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

const Layout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        Job Portal
                    </Typography>

                    {user && (
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="body1">{user.name}</Typography>
                            <Chip
                                label={user.role}
                                size="small"
                                color={user.role === "admin" ? "warning" : "default"}
                                sx={{ textTransform: "capitalize", color: "white" }}
                            />
                            <Button color="inherit" variant="outlined" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Outlet />
        </>
    );
};

export default Layout;
