import React from "react";
import { Button, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  grid: {
    padding: "50px",
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
  card: {
    width: "350px",
    padding: "15px",
    margin: "15px",
  },
}));

export default function AdminPage() {
  const classes = useStyles();
  const history = useHistory();

  const handleOnClickObservation = () => {
    history.push("admin/observed");
  };

  const handleOnClickForecast = () => {
    history.push("admin/forecast");
  };

  const handleOnClickForecastDate = () => {
    history.push("admin/forecastDate");
  };

  const handleOnClickNewUser = () => {
    history.push("admin/newUser");
  };

  const handleOnClickRegistration = () => {
    history.push("admin/registration");
  };

  const handleOnClickHofUpload = () => {
    history.push("admin/hofupload");
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
        variant={"h3"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        Admin Page
      </Typography>
      <Typography
        variant={"h4"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        What would you like to do?
      </Typography>
      <Grid container direction="row" spacing={4} className={classes.grid}>
        <Grid item xs={4}>
          <Button
            variant={"contained"}
            color={"primary"}
            className={classes.card}
            onClick={handleOnClickObservation}
          >
            Enter Observed Weather
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant={"contained"}
            color={"primary"}
            className={classes.card}
            onClick={handleOnClickForecast}
          >
            Edit User's Forecast
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant={"contained"}
            color={"primary"}
            className={classes.card}
            onClick={handleOnClickForecastDate}
          >
            Set Current Forecasting Date
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant={"contained"}
            color={"primary"}
            className={classes.card}
            onClick={handleOnClickNewUser}
          >
            Create New user
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant={"contained"}
            color={"primary"}
            className={classes.card}
            onClick={handleOnClickRegistration}
            disabled={true}
          >
            Turn Registration On/Off
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant={"contained"}
            color={"primary"}
            className={classes.card}
            onClick={handleOnClickHofUpload}
          >
            Upload Hall of Fame File
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
