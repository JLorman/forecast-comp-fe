import React, { useEffect, useState } from "react";
import {Grid, Typography, makeStyles, Button} from "@material-ui/core";
import  { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import { useTheme } from "@material-ui/core/styles";
import { BackEnd } from "../../Utils/HttpClient";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    margin: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  margin: {
    margin: theme.spacing(1),
    width: "200px",
  },
  button: {
    width: "25ch",
  },
}));

export default function AdminForecastDatePage() {
  const classes = useStyles();
  const [dates, setDates] = useState([])


  const theme = useTheme();

    const handleCompetionReset = async ()=>{
        var final_dates=[]
        for( var i=0; i<dates.length;i++){
            final_dates.push(dates[i].format('YYYY-MM-DD'))
        }
        var final_array ={};
        final_array["dates"]=final_dates;
        console.log(JSON.stringify(final_array))
        // setRequestPending(true);
      const resp = await BackEnd.post(
      `reset-competitions`,
      final_array,
      {},
      {},
      true,
      true
    );
    if (resp?.status < 300) {
      console.log("worked!")
      // setSucxcessForecast(true);
    }
    // setRequestPending(false);
    }




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
            Reset Competition
        </Typography>
        <Typography
            variant={"h5"}
            align={"center"}
            color={"primary"}
        >
            Choose Competion Dates
        </Typography>

        <Calendar 
        value={dates}
        multiple
        plugins={[
            <DatePanel />
           ]}
        onChange={setDates}
        />
         <Grid item xs={4}>
          <Button
            variant={"contained"}
            color={"primary"}
            className={classes.card}
            onClick={handleCompetionReset}
          >
            Reset Competition
          </Button>
        </Grid>
  </Grid>
  );
}
