import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography, Chip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BackEnd } from "../../Utils/HttpClient";
import { updateStatus } from "../../redux/actions/status";
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
  },
}));

export default function AdminPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [registrationMessage, setRegistrationMessage]= useState();
  const isRegistrationAllowed = useSelector(
    (store) => store.status.registrationOpen
  );

  useEffect(()=>{
    var message="Registration is currently " + (isRegistrationAllowed ? 'on' : 'off');
    setRegistrationMessage(message);

  },[isRegistrationAllowed])

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

  const handleOnClickRegistration = async () => {
    const resp = await BackEnd.put(
      `status`,
      { registrationOpen: !isRegistrationAllowed },
      {},
      {},
      true,
      true
    );

    BackEnd.get("status").then((resp) => {
      if (resp?.status < 300) {
        dispatch(updateStatus(resp.data));
      }
    });

  };

  const handleOnClickHofUpload = () => {
    history.push("admin/hofupload");
  };

  const handleOnClickResetCompetition = () => {
    history.push("admin/reset")
  }

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
            onClick={handleOnClickHofUpload}
          >
            Upload Hall of Fame File
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant={"contained"}
            color={"primary"}
            className={classes.card}
            onClick={handleOnClickResetCompetition}
          >
            Reset Competition
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant={"contained"}
            color={"primary"}
            className={classes.card}
            onClick={handleOnClickRegistration}
          >
            Turn Registration On/Off
          </Button>
          <Typography color={"primary"}> {registrationMessage}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
