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

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [emailHelperText, setEmailHelperText] = useState<string>("");
  const [usernameHelperText, setUsernameHelperText] = useState<string>("");
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");

  const [registerError, setRegisterError] = useState<boolean>(false); //error state for Snackbar
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email); //simple regex for email
  };

  const validateUsername = (username: string) => {
    return username.length > 0; //simple check for non-empty username
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; //password should be at least 6 characters long
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formIsValid = true;
    //email validation
    if (!email || !validateEmail(email)) {
      setEmailError(true);
      setEmailHelperText(email ? "Email is not valid" : "Email is required");
      formIsValid = false;
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
    //username validation
    if (!validateUsername(username)) {
      setUsernameError(true);
      setUsernameHelperText("Username is required");
      formIsValid = false;
    } else {
      setUsernameError(false);
      setUsernameHelperText("");
    }
    //password validation
    if (!validatePassword(password)) {
      setPasswordError(true);
      setPasswordHelperText("Password must be at least 6 characters");
      formIsValid = false;
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }

    if (formIsValid) {
      try {
        await register({ email, username, password });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setRegisterError(true);
        setErrorMessage(error?.message || "Register failed. Try again.");
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
              Register
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
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
                error={usernameError}
                helperText={usernameHelperText}
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
                Register
              </Button>
            </form>
            <Typography variant="body2" sx={{ marginTop: 2 }} align="center">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" underline="hover">
                Login here
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Snackbar for error handling */}
      <Snackbar
        open={registerError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setRegisterError(false);
          setErrorMessage("");
        }}
      >
        <Alert
          severity="error"
          onClose={() => {
            setRegisterError(false);
            setErrorMessage("");
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterPage;
