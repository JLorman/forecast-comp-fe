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
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import { useHistory } from "react-router";
import { BackEnd } from "../Utils/HttpClient";

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

export default function Register() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [requestPending, setRequestPending] = React.useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async () => {
    setRequestPending(true);
    const resp = await BackEnd.post(
      "auth/register",
      values,
      {},
      {},
      false,
      true
    );
    console.log(resp);
    if (resp?.status < 300) {
      console.log("Successful response.");
      // Show success snackbar
    }
    history.push("/login");
    setRequestPending(false);
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
        Sign Up!
      </Typography>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="first-name">First Name</InputLabel>
        <Input
          id="first-name"
          value={values.firstName}
          onChange={handleChange("firstName")}
          aria-describedby="first-name"
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="last-name">Last Name</InputLabel>
        <Input
          id="first-name"
          value={values.lastName}
          onChange={handleChange("lastName")}
          aria-describedby="last-name"
        />
      </FormControl>
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
          type="password"
          value={values.password}
          onChange={handleChange("password")}
        />
      </FormControl>
      <Button
        className={clsx(classes.margin, classes.button)}
        onClick={handleSubmit}
        type="submit"
        color="primary"
        variant="contained"
      >
        Submit
      </Button>
      {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}
    </Grid>
  );
}
