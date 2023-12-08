import React from "react";
 import {
   Grid,
   makeStyles,
   Typography,
 } from "@material-ui/core";
 import { useSelector } from "react-redux";//Get and set data
 
 const useStyles = makeStyles((theme) => ({
   header:{
    margin: theme.spacing(4),
   }
 
  }));

 export default function ProfilePage() {
   const classes = useStyles();
   const getEmail = useSelector((store) => store.user?.email);
   const getFirstName = useSelector((store) => store.user?.firstname);
   const getLastName = useSelector((store) => store.user?.lastname);

   return (
     <Grid
       container
       direction="column"
       justifyContent="space-evenly"
       alignItems="center"
     >
       <Grid item xs={6}>
         <br />
         <br />
         <Typography className={classes.header} variant={"h4"} align={"center"} color={"primary"}>
           Your Profile Information
         </Typography>
         <Typography variant={"h6"}>{"Name: " + getFirstName + " " +getLastName}</Typography>
         <Typography variant={"h6"}>{"Email: " + getEmail}</Typography>
       </Grid>
     </Grid>
 )} 