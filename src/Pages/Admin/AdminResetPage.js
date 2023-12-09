import React, { useState } from "react";
import {Grid, Typography, makeStyles, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, useTheme} from "@material-ui/core";
import  { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import { BackEnd } from "../../Utils/HttpClient";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../redux/actions/status";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2),
  },
}));

export default function AdminForecastDatePage() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [dates, setDates] = useState([])
  const [showResetComplete, setShowResetComplete]=useState(false);
  const [showError,setShowError]=useState(false);
  const [showMissingError,setShowMissingError]=useState(false);
  const [requestPending, setRequestPending]=useState(false);
  const [open, setOpen]=useState(false);

  const handleCompetionReset = async ()=>{
    setOpen(false);
    //process dates
    if(dates.length <=0){
      setShowMissingError(true);
      return;
    }
    let final_dates=[]
    for( let i=0; i<dates.length;i++){
        final_dates.push(dates[i].format('YYYY-MM-DD'))
    }
    // send dates to backend to reset competition
    setRequestPending(true);
    let resp = await BackEnd.post(`reset-competitions`, {"dates":final_dates.sort()}, {}, {}, true, true);
    setRequestPending(false);

    if (resp?.status < 300) {
      setShowResetComplete(true);
      //update redux to get new forecast date
      BackEnd.get("status").then((resp) => {
        if (resp?.status < 300) {
          dispatch(updateStatus(resp.data));
        }
      });
    }
    else{
      setShowError(true);
    }
  }
      
  return (
  <Grid container direction="column" justifyContent="space-evenly" alignItems="center" spacing={4}>

    <Typography variant={"h3"} align={"center"} color={"primary"} className={classes.title}>Reset Competition</Typography>
    <Typography variant={"h5"} align={"center"} color={"primary"} className={classes.title}> Choose Competion Dates </Typography>

    <Calendar 
      value={dates}
      multiple
      highlightToday={false}
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
        onClick={()=>setOpen(true)}
      >
        Reset Competition
      </Button>
    </Grid>
    
    {showResetComplete && (
      <Alert onClose={()=>setShowResetComplete(false)} severity="success">
        Reset Completed.
      </Alert>
    )}
    {showError && (
      <Alert onClose={()=>setShowError(false)} severity="error">
        Error Occured During Reset.
      </Alert>
    )}
    {showMissingError && (
      <Alert onClose={()=>setShowMissingError(false)} severity="error">
        Please select at least one date
      </Alert>
    )}
    {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}


    <Dialog open={open}>
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to reset the competion?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action can not be undone so make sure you no longer need last semester's forecast dates, users, observations, or scores.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)} variant={"contained"} className={classes.card}>Cancel</Button>
        <Button onClick={handleCompetionReset} autoFocus color={"primary"} variant={"contained"} className={classes.card} >Continue</Button>
      </DialogActions>
    </Dialog>

  </Grid>
  );
}