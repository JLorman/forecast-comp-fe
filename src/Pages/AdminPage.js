import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

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

export default function AdminPage() {
  const classes = useStyles();

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
      <Typography
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        Enter Observed Weather
      </Typography>
      <Typography
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        Edit Observed Weather
      </Typography>
      <Typography
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        Edit User's Forecast
      </Typography>
      <Typography
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        Set Current Forecasting Date
      </Typography>
      <Typography
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        Create New User
      </Typography>
      <Typography
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        Turn Registration On/Off
      </Typography>
    </Grid>
  );
}
