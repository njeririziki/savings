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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Tooltip  from '@material-ui/core/Tooltip';
import {Link} from 'react-router-dom'
import Firebase from '../config'
import AdminContext from '../Context/AdminContext'

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
    color:'#ffffff',
    fontSize:'20px',
    fontFamily: 'Nunito',
  },
  appToolbar:{
    display:'flex',
    justifyContent:'space-between',
    backgroundColor: '	#0f1724',
    height:100, 
  },
 
  title: {
    justifyContent:'space-between',
    fontSize:40,
    fontFamily:'Sriracha'
  },
  avatar:{
    marginLeft:theme.spacing(5),
    width:120,
    height:120,
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
      
    '&:hover' : {
      backgroundColor: '#cdcdcd',
     
    },
 },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#1d2636',
    
    
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

    '&:hover' : {
      backgroundColor: '#0f1724',
     
    },
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
  const [imageUrl,setImageUrl] = React.useState(null)
  const context = React.useContext(AdminContext)
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
   const logOut = ()=>{
     Firebase.auth().signOut();
   }
   /*React.useEffect(()=>{
    const uid = Firebase.auth().currentUser.uid
    const unsub = Firebase.firestore().collection('Users').doc(uid)
    .get().then( (docsnapshot)=>{
      if(docsnapshot.exists) {
        Firebase.firestore().collection('Users').doc(uid)
        .onSnapshot((doc)=>{
          setImageUrl(doc.data().Avatar)
        }) 
      } 
     
    })
    return ()=> unsub ;
    },[])
*/
React.useEffect(()=>{
  const user= Firebase.auth().currentUser;
   if (user !=null){
     const imageUrl= user.photoURL
     setImageUrl(imageUrl)
   }
  },[])
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Tooltip title =' User profile'>
      <Avatar 
      variant='circle'
      src={imageUrl}
      className={classes.avatar}
      component={Link} to ='/user'
      />  
      </Tooltip> 
     <br/>
      <List className={classes.listItems}  >
      <Tooltip title ='Set your financial goal'>
      <ListItem 
          button 
          component={Link} to ='/goals'>
            <ListItemIcon className={classes.listItems} >
            <Icon.Target/>
            </ListItemIcon>
            <ListItemText 
            primary= 'Goals'
            
            /> 
          </ListItem>
      </Tooltip>
      
           
          <Tooltip title ='Create your budget'>
          <ListItem button 
          component={Link} to ='/budget'>
          <ListItemIcon className={classes.listItems}>
           <Icon.PieChart/>
          </ListItemIcon>
          <ListItemText 
            primary= 'Budget'
            
            /> 
          </ListItem>
          </Tooltip>
       
          <Tooltip title =' Go to expense tracker'>
          <ListItem button 
          component={Link} to ='/expense'>
          <ListItemIcon className={classes.listItems}>
            <Icon.Layers/> 
          </ListItemIcon>
          <ListItemText 
            primary= 'Expense Tracker'
           />
            </ListItem> 
          </Tooltip>
         
          <Tooltip title =' Savings'>
          <ListItem button 
          component={Link} to ='/savings'>
          <ListItemIcon className={classes.listItems}>
            <Icon.Database/>
          </ListItemIcon>
          <ListItemText 
            primary= 'Savings'
            
            /> 

          </ListItem>
          </Tooltip> 
          {context.admin? <Tooltip title =' Admin Panel'>
          <ListItem button 
          component={Link} to ='/adminpanel'>
          <ListItemIcon className={classes.listItems}>
            <Icon.Command/>
          </ListItemIcon>
          <ListItemText 
            primary= 'Admin panel'
            
            /> 
          </ListItem>
          </Tooltip> : null}
        
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar 
        className={classes.appToolbar}
         >
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
          <Tooltip title ='Log out'>
          <IconButton
            color="inherit"
            aria-label="Log out"
            edge="start"
            className={classes.logOut}
            onClick= {logOut}
          >
            <Icon.LogOut />
          </IconButton>
          </Tooltip>
         
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
