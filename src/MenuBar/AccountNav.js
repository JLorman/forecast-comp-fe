import React from "react";
import { IconButton } from "@material-ui/core";
import { StyledMenu, StyledMenuItem } from "./StyledMenu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateToken } from "../redux/actions/token";
import { updateUser } from "../redux/actions/user";

export default function AccountNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (event) => {
    handleButtonClick(event);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(updateToken(null));
    dispatch(updateUser(null));
    sessionStorage.removeItem("jwt");
    history.push("/login");
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleButtonClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClick={handleItemClick}
        onClose={handleClose}
      >
        <StyledMenuItem component={Link} to={"/profile"}>
         <ListItemIcon>
           <AccountCircleIcon fontSize="small" />
         </ListItemIcon>
         <ListItemText primary="Profile" />
         </StyledMenuItem>
        <StyledMenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
