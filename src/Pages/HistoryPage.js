import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

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
}));

export default function HistoryPage() {
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
        variant={"h5"}
        align={"center"}
        color={"primary"}
        className={classes.title}
      >
        Come back after the contest starts to see your results!
      </Typography>
    </Grid>
  );
}
