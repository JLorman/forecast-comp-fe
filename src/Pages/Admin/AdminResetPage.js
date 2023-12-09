import React, { useState } from "react";
import {Grid, Typography, makeStyles, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions} from "@material-ui/core";
import  { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import { useTheme } from "@material-ui/core/styles";
import { BackEnd } from "../../Utils/HttpClient";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../redux/actions/status";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";
import Alert from "@material-ui/lab/Alert";

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
  const dispatch = useDispatch();
  const [dates, setDates] = useState([])
  const [resetComplete, setResetComplete]=useState(false);
  const [showError,setShowError]=useState(false);
  const [showMissingError,setShowMissingError]=useState(false);
  const [requestPending, setRequestPending]=useState(false);
  const [open, setOpen]=useState(false);



  const theme = useTheme();

    const handleCompetionReset = async ()=>{
      setOpen(false);
      //process dates
      var final_dates=[]
      if(dates.length <=0){
        setShowMissingError(true);
        return;
      }
      for( var i=0; i<dates.length;i++){
          final_dates.push(dates[i].format('YYYY-MM-DD'))
      }
      var final_array ={};
      final_array["dates"]=final_dates.sort();

      // send dates to backend to reset competition
      setRequestPending(true);
      const resp = await BackEnd.post(
        `reset-competitions`,
        final_array,
        {},
        {},
        true,
        true
      );

      if (resp?.status < 300) {
        setResetComplete(true);
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
      setRequestPending(false);
    }

    const handleSuccessClose = ()=>{
      setResetComplete(false);
    }

    const handleErrorClose = ()=>{
      setShowError(false);
    }

    const handleMissingClose = ()=>{
      setShowMissingError(false);
    }

    const handleModalClose = ()=>{
      setOpen(false);
    }
    const handleModalOpen = ()=>{
      setOpen(true);
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
            onClick={handleModalOpen}
          >
            Reset Competition
          </Button>
        </Grid>
        {resetComplete && (
          <Alert onClose={handleSuccessClose} severity="success">
            Reset Completed.
          </Alert>
        )}
        {showError && (
          <Alert onClose={handleErrorClose} severity="error">
            Error Occured During Reset.
          </Alert>
        )}
        {showMissingError && (
          <Alert onClose={handleMissingClose} severity="error">
            Please select at least one date
          </Alert>
        )}
        {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}
        <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to reset the competion?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action can not be undone so make sure you no longer need last semester's forecast dates, users, observations, or scores.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} variant={"contained"} className={classes.card}>Cancel</Button>
        <Button onClick={handleCompetionReset} autoFocus color={"primary"} variant={"contained"} className={classes.card} >Continue</Button>
      </DialogActions>
    </Dialog>
  </Grid>
  );
}
