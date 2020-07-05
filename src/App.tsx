import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, RouteComponentProps, withRouter
} from "react-router-dom";
import GatewayListView from "./views/gateway/gateway-list";
import DeviceListView from "./views/devices/device-list"
import {
  AppBar,
  createStyles,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem, ListItemIcon, ListItemText, Divider
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

interface AppProps extends RouteComponentProps {

}

interface AppState {
  drawer: boolean;
}

class App extends React.Component<AppProps,AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      drawer: false,
    } as AppState;
  }

  get classes() {
    const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
      }),
    );
    return useStyles();
  }

  render() {
    return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => this.setState({drawer: true})}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              App
            </Typography>
          </Toolbar>
          <Drawer anchor="left" open={this.state.drawer} onClose={() => this.setState({drawer: false})}>
            <List>
              <ListItem key={'home'} button component={Link} to="/" onClick={() => this.setState({drawer: false})}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItem>
              <ListItem key={'gateways'} button component={Link} to="/gateways" onClick={() => this.setState({drawer: false})}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={'Gateways'} />
              </ListItem>
              <ListItem key={'devices'} button component={Link} to="/devices" onClick={() => this.setState({drawer: false})}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={'Devices'} />
              </ListItem>
            </List>
          </Drawer>
        </AppBar>
        <Switch>
          <Route exact path={`/`}>
            <div className="App">
              <header className="App-header">

                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          </Route>
          <Route exact path={`/gateways`} component={GatewayListView} />
          <Route exact path={`/devices`} component={DeviceListView} />
        </Switch>
      </Router>
    )
  }
}

export default (withRouter(App)) as any
