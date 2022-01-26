import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import Alert from "@material-ui/lab/Alert";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import { BackEnd } from "../Utils/HttpClient";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../redux/actions/token";
import { updateUser } from "../redux/actions/user";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    margin: theme.spacing(4),
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  button: {
    width: "25ch",
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isRegistrationAllowed = useSelector(
    (store) => store.status.registrationOpen
  );

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const [requestPending, setRequestPending] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleKeyPress = async (event) => {
    if (event.charCode == 13) {
      // 13 == 'Enter'
      await handleLoginClick();
    }
  };

  const handleLoginClick = async () => {
    setRequestPending(true);
    const resp = await BackEnd.post("auth/login", values, {}, {}, false, true);
    console.log(resp);
    if (resp?.status < 300) {
      const token = resp.data?.accessToken;
      sessionStorage.setItem("jwt", token);
      dispatch(updateToken(token));
      dispatch(updateUser(resp.data?.user));
      history.push("/");
      // Show success snackbar
    } else {
      setLoginError(true);
    }
    setRequestPending(false);
  };

  const handleRegisterClick = () => {
    setRequestPending(true);
    history.push("/register");
    setRequestPending(false);
  };

  const handleClose = () => {
    setLoginError(false);
    return;
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={4}
    >
      <Typography
        variant={"h4"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        UD Forecast Contest
      </Typography>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="email-address">Email</InputLabel>
        <Input
          id="email-address"
          value={values.email}
          onChange={handleChange("email")}
          aria-describedby="email-address"
          onKeyPress={handleKeyPress}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          variant="outlined"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          onKeyPress={handleKeyPress}
        />
      </FormControl>

      <Button
        className={clsx(classes.margin, classes.button)}
        onClick={handleLoginClick}
        color="primary"
        variant="contained"
      >
        Login
      </Button>
      {isRegistrationAllowed && (
        <Button
          className={clsx(classes.margin, classes.button)}
          onClick={handleRegisterClick}
          color="primary"
          variant="contained"
        >
          Register
        </Button>
      )}
      {loginError && (
        <Alert onClose={handleClose} severity="error">
          Invalid email or password
        </Alert>
      )}
      {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}
    </Grid>
  );
}
