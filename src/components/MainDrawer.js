import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CreateIcon from '@material-ui/icons/Create';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Link, useHistory } from 'react-router-dom';

const drawerWidth = 240;



function MainDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    var history = useHistory();


    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [selectedTab, setSelectedTab] = useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logOut = ()=>{
        localStorage.removeItem('userData')
        history.replace('/')
    }

    useEffect(() => {

        var path = props.pathName.split("/").pop()
        if (path === '') setSelectedTab(0)
        if (path === 'Categories') setSelectedTab(1)
        if (path === 'Products') setSelectedTab(2)
        if (path === 'Entries') setSelectedTab(3)
        if (path === 'Reports') setSelectedTab(4)

    }, []);

    const drawerIcons = [<DashboardIcon />, <ListAltIcon />, <AssignmentIcon />, <CreateIcon />, <AssessmentIcon />]
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            {/* <Divider /> */}
            <List>
                {['Dashboard', 'Categories', 'Products', 'Entries', 'Reports'].map((text, index) => (
                    <ListItem button key={text} component={Link} to={text == 'Dashboard' ? `/home` : `/home/${text}`} onClick={() => setSelectedTab(index)} selected={selectedTab == index}>
                        <ListItemIcon>{drawerIcons[index]}</ListItemIcon>
                        <ListItemText primary={text} />
                        {/* <div style={{ display: 'flex', padding: 5, borderRadius: 40, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', width: 20, height: 20 }}><text style={{ color: 'white', fontSize: 10 }}>1</text></div> */}
                    </ListItem>
                ))}
            </List>



            <div style={{ flex: 1, flexGrow: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', width: 20, backgroundColor: 'red' }}></div>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Responsive drawer
          </Typography>
                    <Button variant="contained" onClick={() =>  logOut()} endIcon={<ExitToAppIcon />}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
                {/* <Switch>
                    <Route path="/home" exact component={Partners} />
                    <Route path="/home/Bills" component={Bills} />
                    <Route path="/home/Partners" component={Partners} />
                    <Route path="/home/Palengke" component={Palengke} />
                    <Route path="/home/Grocery" component={Grocery} />
                    <Route path="/home/Errands" component={Errands} />
                    <Route path="/home/Partner Stores" component={Partner_Stores} />
                    <Route path="/home/Products" component={ProductsTab} />

                    <Route path="/home/GroceryItems" component={GroceryItems} />
                    <Route path="/home/PalengkeItems" component={PalengkeItems} />
                </Switch> */}
            </main>
        </div>
    );
}

MainDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default MainDrawer;