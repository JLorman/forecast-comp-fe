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
  const [HallOfFame, setHallOfFame] = React.useState([]);

  useEffect(() => {
    // get hall of fame data
    BackEnd.get(`/hall-of-fame`).then((resp) => {
      if (resp?.status < 300) {
        setHallOfFame(resp.data);
      }
    });
  }, []);

  const hofColumns = [
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
      width: 150,
    },
    {
      field: "scorePrecip",
      headerName: "Precip Score",
      type: "number",
      width: 200,
    },
    {
      field: "semester",
      headerName: "Semester",
      width: 150,
    },
    {
      field: "year",
      headerName: "Year",
      type: "number",
      width: 150,
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
        Hall of Fame
      </Typography>
      <div className={classes.table}>
        <DataGrid
          pageSize={100}
           rows={HallOfFame}
          columns={hofColumns}
          rowsPerPageOptions={[10]}
          sortModel={[{ field: "year", sort: "desc" }]}
        />
        </div>
    </Grid>
  );
}
