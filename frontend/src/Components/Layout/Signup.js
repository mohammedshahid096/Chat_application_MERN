import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ToastError } from "../AlertPops/Alertpop";
import {
  RegisterUserAction,
  userClearErrorsAction,
} from "../../Actions/UserAction";

const defaultTheme = createTheme();

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.User
  );

  const [errorShow, seterrorShow] = useState(false);
  const [errorMessage, seterrorMessage] = useState(
    "Fields should not be empty"
  );
  const [Details, setDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [uploadProfile, setuploadProfile] = useState(null);

  const onChangeHandler = (e) => {
    if (errorShow) {
      seterrorShow(false);
    }
    setDetails({ ...Details, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !Details.firstname ||
      !Details.lastname ||
      !Details.email ||
      !Details.confirmpassword
    ) {
      seterrorShow(true);
      seterrorMessage("Fields should not be empty");
    } else if (Details.password !== Details.confirmpassword) {
      seterrorShow(true);
      seterrorMessage("Passwords are not matching");
    } else {
      const DetailsFormData = new FormData();
      DetailsFormData.append(
        "name",
        Details.firstname + " " + Details.lastname
      );
      DetailsFormData.append("email", Details.email);
      DetailsFormData.append("password", Details.password);
      if (uploadProfile) {
        DetailsFormData.append("ProfileAvatar", uploadProfile);
      }
      console.log(DetailsFormData.get("ProfileAvatar"));
      dispatch(RegisterUserAction(DetailsFormData));
    }
  };

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(userClearErrorsAction());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, navigate, isAuthenticated, error]);
  return (
    <ThemeProvider theme={defaultTheme}>
      {loading ? (
        <Loader />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {errorShow ? (
              <Stack sx={{ width: "100%", marginTop: "1rem" }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            ) : null}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="file"
                    name="profile"
                    onChange={(e) => setuploadProfile(e.target.files[0])}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}
