import React from "react";
import {
    Button,
    FormControl,
    Grid,
    makeStyles,
    Typography,
  } from "@material-ui/core";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";
import { useTheme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { BackEnd } from "../../Utils/HttpClient";




  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    title: {
      margin: theme.spacing(4),
      marginBottom: theme.spacing(0),
    },
    margin: {
      margin: theme.spacing(1),
      width: "200px",
    },
    button: {
      width: "25ch",
    },
  }));

  


export default function AdminHofUploadPage() {
    const classes = useStyles();
    const theme = useTheme();

    const [file, setFile]=React.useState();
    const [uploadComplete, setUploadComplete]=React.useState(false);
    const [showError,setShowError]=React.useState(false);
    const [requestPending, setRequestPending]=React.useState(false);

    const handleSubmit =  () => {
      const formData = new FormData();
      formData.append("hallOfFameFile", file);
        setRequestPending(true);
        BackEnd.post("hall-of-famers",
        formData,
        {},
        {},
        false,
        true).then((resp) => {
            setRequestPending(false);
            if (resp?.status < 300) {
              console.log(resp.data);
              setUploadComplete(true);
            }
            else{
                setShowError(true);
            }
          });
    };

    const handleSuccessClose = () => {
        setUploadComplete(false);
    }

    const handleErrorClose = () => {
        setShowError(false);
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
        variant={"h6"}
        align={"center"}
        color={"primary"}
        className={classes.title}

      >
            Upload Hall of Fame File
      </Typography>
      <FormControl >
        <input name="hallOfFameFile"className={classes.margin} type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files[0])}></input>
      </FormControl>
      
      <Button
        onClick={handleSubmit}
        color="primary"
        variant="contained"
        className={classes.margin}

      >
        Save
      </Button>
      {uploadComplete && (
        <Alert onClose={handleSuccessClose} severity="success">
          File Sucessfully Saved.
        </Alert>
      )}
      {showError && (
        <Alert onClose={handleErrorClose} severity="error">
          Error Uploading File.
        </Alert>
      )}
      {requestPending && <LoadingSpinner color={theme.palette.primary.main} />}
    </Grid>
  );
}
