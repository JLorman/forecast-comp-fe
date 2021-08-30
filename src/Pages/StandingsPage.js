import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
const useStyles = makeStyles({
  table: {
    width: "100%",
    height: 300,
    margin: "auto",
  },
});
export default function StandingsPage() {
  const classes = useStyles();

  const userColumns = [
    { field: "rankTotal", headerName: "Total Rank", width: 150 },
    { field: "scoreTotal", headerName: "Total Score", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "scoreTemp", headerName: "Temp Score", width: 200 },
    { field: "scorePrecip", headerName: "Precip Score", width: 200 },
    { field: "rankPrecip", headerName: "Precip Rank", width: 200 },
  ];

  const userStandings = [{ id: 0 }];
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
        Standings
      </Typography>
      <div className={classes.table}>
        <DataGrid
          pageSize={100}
          rows={userStandings}
          columns={userColumns}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Grid>
  );
}
