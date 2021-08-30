import React from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import Countdown from "react-countdown";
import clsx from "clsx";
import { BackEnd } from "../Utils/HttpClient";
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    margin: theme.spacing(4),
    marginBottom: theme.spacing(0),
  },
  margin: {
    margin: theme.spacing(1),
    width: "200px",
  },
  button: {
    width: "25ch",
  },
}));

export default function ForecastPage() {
  const classes = useStyles();

  const [requestPending, setRequestPending] = React.useState(false);
  const [deadlineError, setDeadlineError] = React.useState(false);

  const [values, setValues] = React.useState({
    date: "2021-9-9",
    high: 82,
    low: 59,
    precipCat: 3,
    isSnow: false,
    deadlinePassed: true,
  });

  const handleChange = (prop) => (event) => {
    let value = prop == "isSnow" ? !values.isSnow : event.target.value;
    setValues({ ...values, [prop]: value });
  };

  const forecastDate = new Date(values.date);
  const deadlineDate = forecastDate;
  deadlineDate.setHours(17, 30, 0, 0);
  deadlineDate.setDate(deadlineDate.getDate() - 1);
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      setValues({ ...values, deadlinePassed: true });
      return <span>Forecast Deadline Reached</span>;
    } else {
      // Render a countdown
      return (
        <Typography variant={"body"} align={"center"} color={"primary"}>
          {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
          remaining to forecast.
        </Typography>
      );
    }
  };

  const handleSubmit = async () => {
    setRequestPending(true);
    if (values.deadlinePassed) {
      setDeadlineError(true);
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
    setRequestPending(false);
  };

  const handleErrorClose = () => {
    setDeadlineError(false);
    return;
  };

  // Timer for the current forecast
  // Option
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={4}
    >
      <Typography
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        Enter your Forecast for
      </Typography>
      <Typography
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.margin}
      >
        {forecastDate.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>
      <Countdown date={deadlineDate} renderer={renderer} />
      <br />
      <TextField
        id="high-temp"
        label="High Temp"
        type="number"
        onChange={handleChange("high")}
        InputLabelProps={{
          shrink: true,
        }}
        value={values.high}
        disabled={values.deadlinePassed}
        className={classes.margin}
      />
      <TextField
        id="low-temp"
        label="Low Temp"
        type="number"
        onChange={handleChange("low")}
        InputLabelProps={{
          shrink: true,
        }}
        value={values.low}
        disabled={values.deadlinePassed}
        className={classes.margin}
      />
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="precip-cat">Precip Cat</InputLabel>
        <Select
          native
          value={values.precipCat}
          onChange={handleChange("precipCat")}
          inputProps={{
            name: "precip",
            id: "precip-cat",
          }}
          disabled={values.deadlinePassed}
        >
          <option value={1}>1) None</option>
          <option value={2}>2) Trace - .10</option>
          <option value={3}>3) .11 - .25</option>
          <option value={4}>4) .26 - .50</option>
          <option value={5}>5) .51 - .75</option>
          <option value={6}>6) .76 - 1.00</option>
          <option value={7}>7) 1.01 - 1.25</option>
          <option value={8}>8) 1.26 - 1.50</option>
          <option value={9}>9) 1.51 - 2.00</option>
          <option value={10}>10) >= 2.01</option>
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="precip-cat">Precip Type</InputLabel>
        <Select
          native
          value={values.isSnow}
          onChange={handleChange("isSnow")}
          inputProps={{
            name: "precip-type",
            id: "precip-type",
          }}
          disabled={values.deadlinePassed}
        >
          <option value={false}>Rain (if applicable)</option>
          <option value={true}>Snow</option>
        </Select>
      </FormControl>
      <Button
        className={clsx(classes.margin, classes.button)}
        onClick={handleSubmit}
        type="submit"
        color="primary"
        variant="contained"
        disabled={values.deadlinePassed}
      >
        Save
      </Button>
      {deadlineError && (
        <Alert onClose={handleErrorClose} severity="error">
          Sorry, the deadline has passed to enter a forecast.
        </Alert>
      )}
      {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}
    </Grid>
  );
}
