import React from "react";
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
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import { BackEnd } from "../Utils/HttpClient";
import { useDispatch } from "react-redux";
import { updateToken } from "../redux/actions/token";

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

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const [requestPending, setRequestPending] = React.useState(false);

  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleLoginClick = async () => {
    setRequestPending(true);
    const resp = await BackEnd.post("auth/login", values, {}, {}, false, true);
    console.log(resp);
    if (resp?.status < 300) {
      const token = resp.data?.accessToken;
      sessionStorage.setItem("jwt", token);
      dispatch(updateToken(token));
      history.push("/");
      // Show success snackbar
    } else {
      console.log("Unsuccessful response.");
      // Show error snackbar
    }
    setRequestPending(false);
  };

  const handleRegisterClick = () => {
    setRequestPending(false);
    history.push("/register");
    setRequestPending(true);
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
        SU DoGG Weather Forecasting Competition
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
        />
      </FormControl>

      <Button
        className={clsx(classes.margin, classes.button)}
        onClick={handleLoginClick}
        type="submit"
        color="primary"
        variant="contained"
      >
        Login
      </Button>
      <Button
        className={clsx(classes.margin, classes.button)}
        onClick={handleRegisterClick}
        type="submit"
        color="primary"
        variant="contained"
      >
        Register
      </Button>
      {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}
    </Grid>
  );
}
