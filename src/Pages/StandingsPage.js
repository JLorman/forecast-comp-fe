import React, { useEffect } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { BackEnd } from "../Utils/HttpClient";
const useStyles = makeStyles({
  table: {
    width: "75%",
    height: 900,
    margin: "auto",
  },
});
export default function StandingsPage() {
  const classes = useStyles();
  const [userStandings, setUserStandings] = React.useState([]);

  useEffect(() => {
    // get forecast dates
    BackEnd.get(`score/all/standings`).then((resp) => {
      if (resp?.status < 300) {
        setUserStandings(resp.data);
      }
    });
  }, []);

  const userColumns = [
    {
      field: "rankTotal",
      headerName: "Total Rank",
      type: "number",
      width: 150,
    },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    {
      field: "scoreTotal",
      headerName: "Total Score",
      type: "number",
      width: 150,
    },
    {
      field: "scoreTemp",
      headerName: "Temp Score",
      type: "number",
      width: 200,
    },
    { field: "rankTemp", headerName: "Temp Rank", type: "number", width: 200 },
    {
      field: "scorePrecip",
      headerName: "Precip Score",
      type: "number",
      width: 200,
    },
    {
      field: "rankPrecip",
      headerName: "Precip Rank",
      type: "number",
      width: 200,
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
          pageSize={100}
          rows={userStandings}
          columns={userColumns}
          rowsPerPageOptions={[5]}
          sortModel={[{ field: "rankTotal", sort: "asc" }]}
        />
      </div>
    </Grid>
  );
}
