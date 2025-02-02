import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [emailHelperText, setEmailHelperText] = useState<string>("");
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");

  const [loginError, setLoginError] = useState<boolean>(false); //error state for Snackbar
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email); //simple regex for mail
  };

  const validatePassword = (password: string) => {
    return password.length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formIsValid = true;
    //email Validation
    if (!email || !validateEmail(email)) {
      setEmailError(true);
      setEmailHelperText(email ? "Email is not valid" : "Email is required");
      formIsValid = false;
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
    //password Validation
    if (!validatePassword(password)) {
      setPasswordError(true);
      setPasswordHelperText("Password is required");
      formIsValid = false;
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }

    if (formIsValid) {
      try {
        await login({ email, password });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoginError(true);
        setErrorMessage(
          error?.message || "Login failed. Please check your credentials."
        );
      }
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Card sx={{ maxWidth: 400, width: "100%", padding: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ marginBottom: 2 }} align="center">
              Login
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
                error={emailError}
                helperText={emailHelperText}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
                error={passwordError}
                helperText={passwordHelperText}
              />
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </form>
            <Typography variant="body2" sx={{ marginTop: 2 }} align="center">
              Don't have an account?{" "}
              <Link component={RouterLink} to="/register" underline="hover">
                Register here
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Snackbar for error handling */}
      <Snackbar
        open={loginError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setLoginError(false);
          setErrorMessage("");
        }}
      >
        <Alert
          severity="error"
          onClose={() => {
            setLoginError(false);
            setErrorMessage("");
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
