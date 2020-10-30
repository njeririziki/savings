import React,{useEffect,useState, useRef} from 'react';

import {makeStyles, useTheme} from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=> ({
page:{
padding: theme.spacing(4),
height: '40px',
width:'200px'
   }
    
}))

const PaypalFunc = ( props) => {
    const classes= useStyles()
    const [paidFor,setPaidFor]=useState(false);
    const [error,setError]= useState(null);
    const payPalRef= useRef();

    useEffect(()=>{
        window.paypal.Buttons({
            createOrder: (data,actions)=>{
                return actions.order.create({
                    purchase_units:[
                        {
                            description:'savings',
                            amount:{
                                currency_code:'USD',
                                value: props.price,
                            },
                        },
                    ],
                });
            },
          
            onApprove: async(data,actions)=>{
                const order= await actions.order.capture();
                setPaidFor(true);
                console.log(order); 
            },
            onError:err =>{
                setError(err);
                console.error(err);
            }       
         })
         .render(payPalRef.current);
    },);
     
    return (  
        <div className={classes.page}>
            {paidFor && alert('Transfer complete')}
        {error && <div>Please try again</div>}
        <div ref={payPalRef}/>
        </div>
    );
}



export default PaypalFunc;