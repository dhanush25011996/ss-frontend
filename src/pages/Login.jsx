import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Container,
  Link,
  Alert,
  Divider,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Google as GoogleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../components/common";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  selectAuthLoading,
  selectAuthError,
} from "../store/slices/authSlice";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    dispatch(loginStart());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Extract user data and token from Firebase response
      const { user } = userCredential;
      const { accessToken, email, displayName, uid } = user;

      // Construct user object for Redux store
      const userData = {
        id: uid,
        name: displayName || "User",
        email: email,
        avatar: null,
      };

      // Dispatch login success with user data and token
      dispatch(loginSuccess({ user: userData, token: accessToken }));
      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure(err.message || "Login failed"));
    }
  };

  const handleGoogleLogin = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      const { accessToken, email, displayName, uid, photoURL } = user;

      const userData = {
        id: uid,
        name: displayName || "User",
        email: email,
        avatar: photoURL || null, // Include Google profile picture if available
      };

      dispatch(loginSuccess({ user: userData, token: accessToken }));
      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure(err.message || "Google login failed"));
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textAlign: "center",
            mb: 3,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
            Semen Sage
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Transform your life, one day at a time
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight={600}
            textAlign="center"
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 3 }}
          >
            Sign in to continue your journey
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Input
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              startIcon={<EmailIcon />}
              sx={{ mb: 2 }}
            />

            <Input
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              startIcon={<LockIcon />}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loading={loading}
              sx={{ mb: 2 }}
            >
              Sign In
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ mb: 3 }}
            >
              Continue with Google
            </Button>

            <Box textAlign="center">
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/register")}
                sx={{ textDecoration: "none" }}
              >
                Don't have an account? Sign up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
