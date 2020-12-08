import React from 'react';
import {Document,Page,Text,View, StyleSheet} from '@react-pdf/renderer'

const styles= StyleSheet.create({
    pgView:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignContent:'center'
    },
    fpg:{
        backgroundColor: 'tomato',
        color:'#ffffff'
    }
})

const PdfDoc = (props) => {
    let date = new Date();
    const months =['Jan','Feb','Mar','Apr','May',
                     'Jun','Jul','Aug','Sept','Oct','Nov','Dec']
       let month = months[date.getMonth()]
       let year = date.getFullYear()
    return ( 
        <Document>
          
            <Page 
            size='A4'>
                <View>
                <Text style={styles.fpg}>
                            Every Dime Monthly report
                        </Text>
                        <Text style={styles.fpg}>
                            Your Goal {props.goalTitle}
                        </Text>
                        <Text style={styles.fpg}>
                            Target amount {props.goalAmount}
                        </Text>
                        <Text style={styles.fpg}>
                            Target time {props.goalTime}
                        </Text>
                        <Text style={styles.fpg}>
                            TimeLeft {props.goalTimeLeft}
                        </Text>
                   
                    
                <Text >
                        Saving transactions for {month} {year}
                    </Text>
                 
               {props.trans.map(p=> {
                  return(
                    <View >
                  <Text key={p.id}>
                 Amount {p.amount} payed to savings account 
                  </Text>
                  <Text>
                Transaction dates {p.day} at {p.time}
                  </Text>
                  </View>
                    ) 
               })}
                </View>
               
            </Page>
        </Document>
     );
}
 
export default PdfDoc;