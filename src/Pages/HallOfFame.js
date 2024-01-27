import React, {useEffect} from "react";
import { Grid,makeStyles, Typography } from "@material-ui/core";
import { BackEnd } from "../Utils/HttpClient";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles({
  table: {
    width: "70%",
    height: 500,
    margin: "auto",
  },
  
});

export default function HallOfFame() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <br />
      <br />
      <Typography variant={"h4"} align={"center"} color={"primary"}>
        Hall of Fame
      </Typography>
      <div className={classes.table} align="center">
      <iframe src={process.env.REACT_APP_API_URL+"hall-of-famers"} title="description" width="900" height="600" align="center"></iframe>
        </div>
    </Grid>
  );
}
