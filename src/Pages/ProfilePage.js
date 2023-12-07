import React, {useEffect} from "react";
import {
  Grid,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";//Get and set data
import { BackEnd } from "../Utils/HttpClient";
import { updateUser } from "../redux/actions/user";
//import {combineReducers} from "../redux/actions"
import { useHistory } from "react-router";//used to switch pages
//import { UPDATE_USER } from "../redux/actions/user";
//import allActions from '../redux/actions'

const useStyles = makeStyles({
  table: {
    width: "100%",
    height: 600,
    margin: "auto",
  },
});

export default function ProfilePage() {
  const classes = useStyles();
  {/*return <h2>Profile Page</h2>;*/}

  //const [userSettings, setUserSettings] = React.useState([]);
  const getEmail = useSelector((store) => store.user?.email);
  const getFirstName = useSelector((store) => store.user?.firstname);
  const getLastName = useSelector((store) => store.user?.lastname);
  console.log(useSelector((store) => store.user));
  //Dispatch Stuff
  const dispatch = useDispatch();
  
  const userG = {firstname: "George", lastname: "Bob"};

//Attempt to add UpdateEmail feature below, still needs work
/*
const updateEmail = (user) => {
  const userG = {firstname: "George", lastname: "Bob"};
  BackEnd.get("user/me").then((resp) => {
    const gore = resp;
    if (resp.data.firstname != userG.firstname) {
      resp.data.firstname = userG.firstname;
      resp.data.lastname = userG.lastname;
      dispatch(updateUser(resp.data));
      //BackEnd.put(("user/" + resp.data.id), resp, {'isSuperAdmin': true,'userId':resp.data.id}, {}, true, true).then((response) => {
      BackEnd.put(("user/"  + resp.data.id), resp, {}, {}, true, true).then((response) => {
        //Returns 200 value when sucess
        if(response?.status < 300){
          console.log(response);
        }
      });
        //dispatch(updateUser(resp.data));
      //});
    }
  });
  //BackEnd.put("user/me", user);*/
  const history = useHistory();
  const handleBack = () => {
    history.push("/HallOfFame");
  };

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
        <Typography variant={"h4"} align={"center"} color={"primary"}>
          Salisbury University DoGG
        </Typography>
        <Typography variant={"h5"} align={"center"} color={"primary"}>
          Forecast Contest
        </Typography>
        <Typography variant={"h6"} align={"center"} color={"primary"}>
          User Profile
        </Typography>
        <Typography variant={"body"}>
          <b>NAME: </b> {getFirstName} {getLastName}
          <br />
          <b>EMAIL:</b> {getEmail}
          </Typography>
      </Grid>
    </Grid>
)}