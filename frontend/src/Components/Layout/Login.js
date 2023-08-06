import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginUserAction,
  userClearErrorsAction,
} from "../../Actions/UserAction";
import { ToastError } from "../AlertPops/Alertpop";
import Loader from "../Loader/Loader";

const defaultTheme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.User
  );

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorShow, seterrorShow] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const emailOnChangeHandler = (value) => {
    if (errorShow) {
      seterrorShow(false);
    }
    setemail(value);
  };

  const passwordOnChangeHandler = (value) => {
    if (errorShow) {
      seterrorShow(false);
    }
    setpassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      seterrorShow(true);
      seterrorMessage("Email is Required");
    } else if (!password) {
      seterrorShow(true);
      seterrorMessage("Password is Required");
    } else {
      dispatch(LoginUserAction(email, password));
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
  }, [dispatch, navigate, error, isAuthenticated]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading ? (
        <Loader />
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://b1681952.smushcdn.com/1681952/wp-content/uploads/2022/09/search-messages.jpg?lossy=0&strip=1&webp=1)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              {errorShow ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">{errorMessage}</Alert>
                </Stack>
              ) : null}

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => emailOnChangeHandler(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => passwordOnChangeHandler(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Sign In
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mb: 2 }}
                >
                  Get Guest User Credentials
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/login" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
};

export default Login;
