import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { BackEnd } from "../Utils/HttpClient";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles({
  table: {
    width: "60%",
    height: 500,
    margin: "auto",
  },
});

export default function ClimatologyPage() {
  const classes = useStyles();
  const [climo, setClimo] = useState([]);

  const userColumns = [
    { field: "month", headerName: "Month", width: 150 },
    { field: "day", headerName: "Day", width: 150 },
    { field: "high", headerName: "High", width: 150 },
    { field: "low", headerName: "Low", width: 150 },
    { field: "precipCat", headerName: "Precip Cat", width: 150 },
  ];

  useEffect(() => {
    BackEnd.get("climatology").then((resp) => {
      if (resp?.status < 300) {
        setClimo(resp.data);
      }
    });
  }, []);

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
        Climatology
      </Typography>
      <div className={classes.table}>
        <DataGrid
          pageSize={31}
          rows={climo}
          columns={userColumns}
          rowsPerPageOptions={[5]}
        />
      </div>
      {/*<Table className={classes.table} size={"small"}>*/}
      {/*  <TableHead>*/}
      {/*    <TableRow className={classes.row}>*/}
      {/*      <TableCell align={"center"}>*/}
      {/*        <b>Month</b>*/}
      {/*      </TableCell>*/}
      {/*      <TableCell align={"center"}>*/}
      {/*        <b>Day</b>*/}
      {/*      </TableCell>*/}
      {/*      <TableCell align={"center"}>*/}
      {/*        <b>High Temp</b>*/}
      {/*      </TableCell>*/}
      {/*      <TableCell align={"center"}>*/}
      {/*        <b>Low Temp</b>*/}
      {/*      </TableCell>*/}
      {/*      <TableCell align={"center"}>*/}
      {/*        <b>Precip Cat</b>*/}
      {/*      </TableCell>*/}
      {/*    </TableRow>*/}
      {/*  </TableHead>*/}
      {/*  <TableBody>*/}
      {/*    {climo.map((row) => (*/}
      {/*      <TableRow key={row.userId} className={classes.row}>*/}
      {/*        <TableCell align={"center"} component="th" scope="row">*/}
      {/*          {row.month}*/}
      {/*        </TableCell>*/}
      {/*        <TableCell align={"center"}>{row.day}</TableCell>*/}
      {/*        <TableCell align={"center"}>{row.high}</TableCell>*/}
      {/*        <TableCell align={"center"}>{row.low}</TableCell>*/}
      {/*        <TableCell align={"center"}>{row.precipCat}</TableCell>*/}
      {/*      </TableRow>*/}
      {/*    ))}*/}
      {/*  </TableBody>*/}
      {/*</Table>*/}
    </Grid>
  );
}
