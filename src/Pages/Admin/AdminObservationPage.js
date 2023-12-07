import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import { BackEnd } from "../../Utils/HttpClient";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";

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

export default function AdminObservationPage() {
  const classes = useStyles();

  const theme = useTheme();
  const [requestPending, setRequestPending] = React.useState(false);
  const [successForecast, setSuccessForecast] = React.useState(false);
  const [forecastDates, setForecastDates] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState(null);
  const [values, setValues] = React.useState({
    // date: "2021-9-9",
    // high: 82,
    // low: 59,
    // precipCat: 3,
    // isSnow: false,
    // deadlinePassed: true,
  });

  useEffect(() => {
    if (currentDate) {
      BackEnd.get(`observation/${currentDate}`).then((resp) => {
        if (resp?.status < 300) {
          console.log(resp.data);
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
  }, [currentDate, forecastDates]);

  useEffect(() => {
    // get forecast dates
    BackEnd.get(`forecast`).then((resp) => {
      if (resp?.status < 300) {
        setForecastDates(resp.data);
      }
    });
  }, []);

  const handleChange = (prop) => (event) => {
    let value = prop == "isSnow" ? !values.isSnow : event.target.value;
    setValues({ ...values, [prop]: value });
  };

  const handleOnSelectDate = () => (event) => {
    setCurrentDate(event.target.value);
  };

  const handleSubmit = async () => {
    setRequestPending(true);
    const resp = await BackEnd.put(
      `observation/${values.id}`,
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
        Enter the Observed Forecast for
      </Typography>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="forecastDate">Select Forecast Date</InputLabel>
        <Select
          native
          onChange={handleOnSelectDate()}
          variant={"outlined"}
          inputProps={{
            name: "forecastDate",
            id: "forecastDateId",
          }}
        >
          <option value={0}> </option>
          {forecastDates.map((forecastDate) => {
            return (
              <option value={forecastDate.date}>{forecastDate.date}</option>
            );
          })}
        </Select>
      </FormControl>
      <Typography
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.margin}
      ></Typography>
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
        disabled={!currentDate}
      >
        Save
      </Button>
      {successForecast && (
        <Alert onClose={handleSuccessClose} severity="success">
          Observed Data Saved.
        </Alert>
      )}
      {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}
    </Grid>
  );
}
