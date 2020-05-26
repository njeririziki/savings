import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as Icon from 'react-feather';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom'
import Firebase from '../config'


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appToolbar:{
    display:'flex',
    justifyContent:'space-between',
    backgroundColor: '#263238',
    height:100, 
  },
  title: {
    justifyContent:'space-between',
    fontSize:40,
    fontFamily:'Sriracha'
  },
  avatar:{
    marginRight:theme.spacing(2),
    width:100,
    height:100,
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
  logOut:{
    color:'#000000',
    backgroundColor:'#ffffff',
 },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#263238',
    
    '&hover, &focus' : {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor:(theme.palette.grey[300], 0.12),
    },
  },
  listItems:{
    color:'#ffffff',
    fontSize:25,
    fontFamily:'Sriracha'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const Home  = (props) => {
    const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
   const logOut = ()=>{
     Firebase.auth().signOut();
   }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Box  className={classes.avatar}>
      <Avatar 
      variant='circle'
      component={Link} to ='/user'
      />
      </Box>
      
      <Divider style={{backgroundColor:'#ffffff'}}/>
      <List>
      
          <ListItem 
          button 
          component={Link} to ='/goals'>
            
            <ListItemText 
            primary= 'Goals'
            className={classes.listItems} 
            /> 
          </ListItem>
          <Divider style={{backgroundColor:'#ffffff'}}/>
          <ListItem button 
          component={Link} to ='/budget'>>
          <ListItemText 
            primary= 'Budget'
            className={classes.listItems} 
            /> 
          </ListItem>
          <Divider style={{backgroundColor:'#ffffff'}}/>
          <ListItem button 
          component={Link} to ='/expense'>>
          <ListItemText 
            primary= 'Expenses'
            className={classes.listItems} 
            /> 
          </ListItem>
          <Divider style={{backgroundColor:'#ffffff'}}/> 
          <ListItem button 
          component={Link} to ='/goals'>>
          <ListItemText 
            primary= 'Savings'
            className={classes.listItems} 
            /> 
          </ListItem>
          <Divider style={{backgroundColor:'#ffffff'}}/>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar 
        className={classes.appToolbar}
        style={{}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Icon.Menu />
          </IconButton>
          <Typography 
          variant="h4"
          className={classes.title}
          noWrap>
           {props.Appbarname? props.Appbarname:'Every Dime' } 
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Log out"
            edge="start"
            className={classes.logOut}
            onClick= {logOut}
          >
            <Icon.LogOut />
          </IconButton>
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
        <div className={classes.toolbar}>
    
        {props.GoalModal}
        {props.Content}
        {props.circularProgress}
        </div> 
      </main>
       </div>
      );
}
 
export default Home ;
