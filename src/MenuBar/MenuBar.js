import React from "react";
import {
  AppBar,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import HamburgerNav from "./HamburgerNav";
import AccountNav from "./AccountNav";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function MenuBar() {
  const classes = useStyles();

  return (
    <AppBar color="primary" position={"sticky"}>
      <Toolbar>
        <HamburgerNav />
        <Typography variant="h6" className={classes.title}>
          SU DoGG Weather Forecasting Competition
        </Typography>
        <AccountNav />
      </Toolbar>
    </AppBar>
  );
}
