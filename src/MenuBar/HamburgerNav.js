import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import BarChartIcon from "@material-ui/icons/BarChart";
import PublicIcon from "@material-ui/icons/Public";
import { Link } from "react-router-dom";
import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import { StyledMenu, StyledMenuItem } from "./StyledMenu";

const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

export default function HamburgerNav() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

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

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={handleButtonClick}
      >
        <MenuIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClick={handleItemClick}
        onClose={handleClose}
      >
        <StyledMenuItem component={Link} to={"/"}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to={"/forecast"}>
          <ListItemIcon>
            <WbSunnyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Forecast" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to={"/history"}>
          <ListItemIcon>
            <TimelineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="History" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to={"/standings"}>
          <ListItemIcon>
            <BarChartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Standings" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to={"/climatology"}>
          <ListItemIcon>
            <PublicIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Climatology" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
