import React, { useEffect } from "react";
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
import { useTheme } from "@material-ui/core/styles";
import { BackEnd } from "../Utils/HttpClient";
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { deadlineReached } from "../redux/actions/status";

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
  const dispatch = useDispatch();
  const isForecastExpired = useSelector(
    (store) => store.status.isForecastExpired
  );
  const userId = useSelector((store) => store.user.id);
  const currentDate = useSelector((store) => store.status.currentDate);

  const theme = useTheme();
  const [requestPending, setRequestPending] = React.useState(false);
  const [deadlineError, setDeadlineError] = React.useState(false);
  const [successForecast, setSuccessForecast] = React.useState(false);
  const [values, setValues] = React.useState({
    // date: "2021-9-9",
    // high: 82,
    // low: 59,
    // precipCat: 3,
    // isSnow: false,
    // deadlinePassed: true,
  });

  useEffect(() => {
    if (userId && currentDate) {
      BackEnd.get(`entry/${userId}/${currentDate}`).then((resp) => {
        if (resp?.status < 300) {
          setValues({
            high: resp.data.high,
            low: resp.data.low,
            isSnow: resp.data.isSnow,
            precipCat: resp.data.precipCat,
            id: resp.data.id,
          });
        }
      });
    }
  }, [userId, currentDate]);

  const handleChange = (prop) => (event) => {
    let value = prop == "isSnow" ? !values.isSnow : event.target.value;
    setValues({ ...values, [prop]: value });
  };

  const forecastDate = new Date(currentDate + "T00:00:00.000-05:00");
  const deadlineDate = new Date(forecastDate);
  deadlineDate.setHours(17, 30, 0, 0);
  deadlineDate.setDate(deadlineDate.getDate() - 1);
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      dispatch(deadlineReached());
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
    if (deadlineDate < new Date()) {
      setDeadlineError(true);
      setRequestPending(false);
      return;
    }
    const resp = await BackEnd.put(
      `entry/${values.id}`,
      values,
      {},
      {},
      true,
      true
    );
    if (resp?.status < 300) {
      setSuccessForecast(true);
    }
    setRequestPending(false);
  };

  const handleErrorClose = () => {
    setDeadlineError(false);
    return;
  };

  const handleSuccessClose = () => {
    setSuccessForecast(false);
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
        disabled={isForecastExpired}
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
        disabled={isForecastExpired}
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
          disabled={isForecastExpired}
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
          disabled={isForecastExpired}
        >
          <option value={false}>Rain (if applicable)</option>
          <option value={true}>Snow</option>
        </Select>
      </FormControl>
      <Button
        className={clsx(classes.margin, classes.button)}
        onClick={handleSubmit}
        color="primary"
        variant="contained"
        disabled={isForecastExpired}
      >
        Save
      </Button>
      {deadlineError && (
        <Alert onClose={handleErrorClose} severity="error">
          Sorry, the deadline has passed to enter a forecast.
        </Alert>
      )}
      {successForecast && (
        <Alert onClose={handleSuccessClose} severity="success">
          Forecast Saved.
        </Alert>
      )}
      {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}
    </Grid>
  );
}
