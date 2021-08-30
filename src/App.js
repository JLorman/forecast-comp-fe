import React from "react";
import MenuBar from "./MenuBar/MenuBar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import HomePage from "./Pages/HomePage";
import ForecastPage from "./Pages/ForecastPage";
import ClimatologyPage from "./Pages/ClimatologyPage";
import HallOfFame from "./Pages/HallOfFame";
import HistoryPage from "./Pages/HistoryPage";
import StandingsPage from "./Pages/StandingsPage";
import ProfilePage from "./Pages/ProfilePage";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { useSelector } from "react-redux";

const salisbury = createTheme({
  palette: {
    primary: {
      main: "#800000",
    },
    secondary: {
      main: "#F7C55A",
    },
  },
});

export default function App() {
  const token = useSelector((store) => store.token);

  return (
    <MuiThemeProvider theme={salisbury}>
      <BrowserRouter>
        {!token ? (
          <Switch>
            <Route path={"/register"} component={Register} />
            <Route path={"/login"} component={Login} />
            <Route>
              <Redirect to={"/login"} />
            </Route>
          </Switch>
        ) : (
          <>
            <MenuBar />
            <Switch>
              <Route exact path={"/"} component={HomePage} />
              <Route path={"/forecast"} component={ForecastPage} />
              <Route path={"/history"} component={HistoryPage} />
              <Route path={"/standings"} component={StandingsPage} />
              <Route path={"/climatology"} component={ClimatologyPage} />
              <Route path={"/hof"} component={HallOfFame} />
              <Route path={"/profile"} component={ProfilePage} />
              <Route>
                <Redirect to={"/"} />
              </Route>
            </Switch>
          </>
        )}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
