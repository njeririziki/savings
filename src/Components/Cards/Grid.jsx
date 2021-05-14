import React from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      //marginBottom:'10em'
    },
    paper: {
      height: 'auto',
      //width: 'fit-content',
      padding:'1em'
    },
  
  }));
   const arr=[
     {key: 1,
      text:'The FlatScreen TV',
     icon:<Icon.Compass/> 
    },
    {key: 2,
        text:' 12,000',
        icon:<Icon.DollarSign /> },
    {key: 3,
          text:'12 months to go',
          icon:<Icon.Clock/> }
   ]


const DashGrid = () => {
    const classes = useStyles();
    return (  
        <Grid item xs>
        <Grid container justify="center" spacing={5}>
          {arr.map((value) => (
            <Grid key={value.key} item>
              <Paper className={classes.paper} >
                <Typography variant='h5'>
                  {value.icon}
                {value.text}
                </Typography>
               
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
}
 
export default DashGrid;