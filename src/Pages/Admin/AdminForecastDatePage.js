import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import { BackEnd } from "../../Utils/HttpClient";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";
import Alert from "@material-ui/lab/Alert";
import { updateStatus } from "../../redux/actions/status";
import { useDispatch } from "react-redux";

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

export default function AdminForecastDatePage() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const theme = useTheme();
  const [requestPending, setRequestPending] = React.useState(false);
  const [successForecast, setSuccessForecast] = React.useState(false);
  const [forecastDates, setForecastDates] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState(null);

  useEffect(() => {
    // get forecast dates
    BackEnd.get(`forecast`).then((resp) => {
      if (resp?.status < 300) {
        setForecastDates(resp.data);
      }
    });
  }, []);

  const handleOnSelectDate = () => (event) => {
    setCurrentDate(event.target.value);
  };

  const handleSubmit = async () => {
    setRequestPending(true);
    const resp = await BackEnd.put(
      `status`,
      { currentDate: currentDate },
      {},
      {},
      true,
      true
    );
    if (resp?.status < 300) {
      dispatch(
        updateStatus({ currentDate: currentDate, isForecastExpired: false })
      );
      setSuccessForecast(true);
    }
    setRequestPending(false);
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
        Select the Date to be Forecasted For
      </Typography>
      <Typography
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        The deadline to forecast is 5:30 pm the day before.
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
          Forecast Date Set.
        </Alert>
      )}
      {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}
    </Grid>
  );
}
