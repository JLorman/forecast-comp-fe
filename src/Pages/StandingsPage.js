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
    { field: "scoreTemp", headerName: "Temp Score", width: 150 },
    { field: "scorePrecip", headerName: "Precip Score", width: 150 },
    { field: "rankPrecip", headerName: "Precip Rank", width: 150 },
  ];

  const userStandings = [
    {
      id: 1,
      userId: 1,
      firstName: "John",
      lastName: "Lorman",
      scoreTotal: 1,
      scoreTemp: 1,
      scorePrecip: 1,
      rankTotal: 1,
      rankTemp: 1,
      rankPrecip: 1,
    },
    {
      id: 2,
      userId: 2,
      firstName: "Brent",
      lastName: "Skeeter",
      scoreTotal: 2,
      scoreTemp: 2,
      scorePrecip: 2,
      rankTotal: 2,
      rankTemp: 2,
      rankPrecip: 2,
    },
  ];
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
          hideFooterPagination
          rows={userStandings}
          columns={userColumns}
        />
      </div>
    </Grid>
  );
}
