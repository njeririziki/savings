import React from 'react';
import {Document,Page,Text,View, StyleSheet} from '@react-pdf/renderer'

const styles= StyleSheet.create({
    pgView:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'70px',
    },
    fpg:{
        fontSize: "20pt",
        padding:'5px',
        color:'#006978'
    },
    prpg:{
        fontSize: "13pt",
       marginLeft:"30px"
    },
    sepg:{
        fontSize: "10pt",
        paddingBottom:'10px',
        marginLeft:"30px"
    },
    head:{
        color:'#006978',
        fontSize: "20pt",
        padding:'10px',
        marginLeft:"20px"
    },
    total:{
        fontSize: "15pt",
        padding:'10px',
        marginLeft:"40px"
    },
    pg2View:{
        display:'flex',
        flexDirection:'column',
        marginTop:'50px',
      },
})

const PdfDoc = (props) => {
    let date = new Date();
    const months =['Jan','Feb','Mar','Apr','May',
                     'Jun','Jul','Aug','Sept','Oct','Nov','Dec']
       let month = months[date.getMonth()]
       let year = date.getFullYear()
    return ( 
        <Document>
            <Page>
                <View style={styles.pgView}>
                <Text style={styles.fpg}>
                           EVERYDIME MONTHLY REPORT
                        </Text>
                        <Text style={styles.fpg}>
                           Goal : {props.goalTitle}
                        </Text>
                        <Text style={styles.fpg}>
                            Target amount: {props.goalAmount} USD
                        </Text>
                        <Text style={styles.fpg} >
                            Target time {props.goalTime} year 
                        </Text>
                       
                      
                   
                </View>
            </Page>
          
            <Page 
            size='A4'>
                <View style={styles.pg2View}>
               
                    
                <Text style={styles.head}>
                        Saving transactions for {month} {year}
                    </Text>
                 
               {props.trans.map(p=> {
                  return(
                    <View >
                  <Text key={p.id} style={styles.prpg}>
                 Amount $ {p.amount} payed to savings account 
                  </Text>
                  <Text style={styles.sepg}>
                Transaction dates {p.day} at {p.time}
                  </Text>
                  </View>
                    ) 
               })}
                <Text style={styles.total}>
                            Total savings amount $ {props.savings}
                        </Text>
                </View>
               
            </Page>
        </Document>
     );
}
 
export default PdfDoc;