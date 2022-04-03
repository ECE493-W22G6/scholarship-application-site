import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Logout from '@mui/icons-material/Logout';
// import { mainListItems, secondaryListItems } from './ListSettings';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Password from '@mui/icons-material/Password';
import AssignmentIcon from '@mui/icons-material/Assignment';

import ChangeProfile from './ChangeProfile';
import ChangePassword from './ChangePassword';

const styles = {
    root: {
        display: 'flex',
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
    },
    appBarShift: {
        marginLeft: 240,
        width: `calc(100% - 240px)`,
    },
    content: {
        flexGrow: 1,
        overflow: 'auto',
        height: '100vh',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
    },
    drawerPaperClose: {
        overflowX: 'hidden',
    },
};

class Settings extends React.Component {
    state = {
        open: true,
        showListItem: 1,
    };

    render() {
        const openDrawer = (boolean) => {
            console.log(this.state)
            this.setState({
                ...this.state,
                open: boolean
            });
        };

        const showListItem = (integer) => {
            console.log(this.state)
            this.setState({
                ...this.state,
                showListItem: integer
            });
        };

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={() => openDrawer(true)}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge color="secondary">
                                <Logout
                                    onClick={ () => {
                                        localStorage.clear()
                                        // Redirect to login
                                        window.location.href = '/signin'
                                    }
                                    }
                                />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={() => openDrawer(false)}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <div>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Change Profile"
                                    onClick={() => showListItem(1)}
                                />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Password />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Change Password"
                                    onClick={() => showListItem(2)}
                                />
                            </ListItem>
                        </div>
                    </List>
                    <Divider />
                    <List>
                        <div>
                            <ListSubheader inset>Others</ListSubheader>
                            <ListItem button>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Other Information" />
                            </ListItem>
                        </div>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <div className={classes.tableContainer}>
                        {this.state.showListItem === 1 && <ChangeProfile />}
                        {this.state.showListItem === 2 && <ChangePassword />}
                    </div>
                </main>
            </div>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);