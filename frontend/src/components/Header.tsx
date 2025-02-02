import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        boxShadow: "none",
        margin: 0,
        padding: 0,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button component={RouterLink} to="/" color="primary">
            Home
          </Button>
        </Box>

        <Box>
          {isAuthenticated ? (
            <>
              <Button
                component={RouterLink}
                to="/currencies/new"
                color="primary"
              >
                New Currency
              </Button>
              <Button onClick={logout} color="secondary">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="primary">
                Login
              </Button>
              <Button component={RouterLink} to="/register" color="primary">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
