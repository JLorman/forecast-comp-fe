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
import { useTheme } from "@material-ui/core/styles";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";
import { useHistory } from "react-router";
import { BackEnd } from "../../Utils/HttpClient";
import Alert from "@material-ui/lab/Alert";

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

export default function AdminUserPage() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    confPassword: "",
    firstName: "",
    lastName: "",
  });

  const [requestPending, setRequestPending] = React.useState(false);
  const [registrationError, setRegistrationError] = React.useState(false);
  const [successRegistration, setSuccessRegistration] = React.useState(false);
  const [validationError, setValidationError] = React.useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSuccessClose = () => {
    setSuccessRegistration(false);
    return;
  };

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const validatePassword = (password, confPassword) =>{
    if (password === confPassword) {
      return true;
    }
    return false;
  };

  const validateFields = () => {
    let empty = false;
    Object.values(values).forEach((v) => {
      if (v.length == 0) {
        empty = true;
      }
    });
    return empty;
  };

  const handleSubmit = async () => {
    setRequestPending(true);
    if (!validateEmail(values.email)) {
      setValidationError("Invalid Email Address.");
      setRequestPending(false);
      return;
    }
    if(!validatePassword(values.password, values.confPassword)){
      setValidationError("Passwords do not match.");
      setRequestPending(false);
      return;
    }
    const resp = await BackEnd.post(
      "auth/register",
      values,
      {},
      {},
      false,
      true
    );
    if (resp?.status < 300) {
      setSuccessRegistration(true);
    } else {
      setRegistrationError(true);
    }
    setRequestPending(false);
  };

  const handleBack = () => {
    history.back();
  };

  const handleRequestClose = () => {
    setRegistrationError(false);
    return;
  };

  const handleEmailErrorClose = () => {
    setEmailValidationError(false);
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
        Create a New User
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
          id="last-name"
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
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="confPassword">Confirm Password</InputLabel>
        <Input
          id="confPassword"
          variant="outlined"
          type="password"
          value={values.confPassword}
          onChange={handleChange("confPassword")}
        />
      </FormControl>
      <Button
        className={clsx(classes.margin, classes.button)}
        onClick={handleSubmit}
        type="submit"
        color="primary"
        variant="contained"
        disabled={validateFields()}
      >
        Sign up
      </Button>
      <Button
        className={clsx(classes.margin, classes.button)}
        onClick={handleBack}
        type="submit"
        color="primary"
        variant="contained"
      >
        Back
      </Button>
      {registrationError && (
        <Alert onClose={handleRequestClose} severity="error">
          Error registering, please try again.
        </Alert>
      )}
      {validationError && (
        <Alert onClose={handleEmailErrorClose} severity="error">
          {validationError}
        </Alert>
      )}
      {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}
      {successRegistration && (
        <Alert onClose={handleSuccessClose} severity="success">
          User Created Successfully
        </Alert>
      )}
    </Grid>
  );
}
