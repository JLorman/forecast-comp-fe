import React, { useEffect } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { BackEnd } from "../Utils/HttpClient";
import { useSelector } from "react-redux";
const useStyles = makeStyles({
  table: {
    width: "75%",
    height: 900,
    margin: "auto",
  },
});
export default function HistoryPage() {
  const classes = useStyles();
  const userId = useSelector((store) => store.user.id);
  const [userHistory, setUserHistory] = React.useState([]);

  useEffect(() => {
    // get forecast dates
    if (userId) {
      BackEnd.get(`score/user/history/${userId}`).then((resp) => {
        if (resp?.status < 300) {
          setUserHistory(resp.data);
        }
      });
    }
  }, [userId]);

  const historyColumns = [
    {
      field: "forecastDate",
      headerName: "Date",
      type: "string",
      width: 150,
    },
    {
      field: "totalScore",
      headerName: "Score",
      type: "number",
      width: 125,
    },
    {
      field: "high",
      headerName: "High",
      type: "number",
      width: 125,
    },
    {
      field: "low",
      headerName: "Low",
      type: "number",
      width: 150,
    },
    {
      field: "precipCat",
      headerName: "Precip",
      type: "number",
      width: 125,
    },
    {
      field: "isSnow",
      headerName: "Snow?",
      type: "boolean",
      width: 125,
    },
    {
      field: "observedHigh",
      headerName: "Obs. High",
      type: "number",
      width: 125,
    },
    {
      field: "observedLow",
      headerName: "Obs. Low",
      type: "number",
      width: 150,
    },
    {
      field: "observedCat",
      headerName: "Obs. Cat",
      type: "number",
      width: 125,
    },
    {
      field: "observedType",
      headerName: "Obs. Snow?",
      type: "boolean",
      width: 125,
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
        Your History
      </Typography>
      <div className={classes.table}>
        <DataGrid
          pageSize={100}
          rows={userHistory}
          columns={historyColumns}
          rowsPerPageOptions={[5]}
          sortModel={[{ field: "forecastDate", sort: "asc" }]}
        />
      </div>
    </Grid>
  );
}
