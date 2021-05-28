import React from 'react';

import {ResponsivePie} from '@nivo/pie'

const pieData=[
    {
         id:'saved',
         label: 'saved ',
         value: 20,
         color: '#ff5252'
     },
   {
       id:'remainder',
       label: ' remainder',
       value: 50,
       color: '#395C58'
   },

   {
     id:'spent',
     label: 'spent ',
     value: 50,
     color: '#ffc400'
 },
]

const Pie = ({data}) => {
    return ( 
        <div style={{height:'370px', width:'350px', backgroundColor:'#ffffff'}}>
            <ResponsivePie
             data={pieData}
             margin={{ top: 20, right: 70, bottom: 20, left: 20 }}
             innerRadius={0.6}
             padAngle={0.5}
             cornerRadius={3}
             colors={{ datum: 'data.color' }}
             borderWidth={1}
             borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
             arcLinkLabelsTextColor="#ffffff"
             arcLinkLabelsThickness={2}
             arcLinkLabelsColor= '#ffffff'
            arcLabelsSkipAngle={10}
             arcLabelsTextColor= '#ffffff'
            //  radialLabelsLinkColor={'#ffffff' }
            //  radialLabelsTextColor={'#ffc400'}
             legends={[
                 {
                     anchor: 'top-right',
                     direction: 'column',
                     justify: false,
                     translateX: 70,
                     translateY: 0,
                     itemsSpacing: 0,
                     itemWidth: 80,
                     itemHeight: 20,
                     itemTextColor: '#999',
                     itemDirection: 'left-to-right',
                     itemOpacity: 1,
                     symbolSize: 12,
                     symbolShape: 'circle',
                     effects: [
                         {
                             on: 'hover',
                             style: {
                                 itemTextColor: '#000'
                             }
                         }
                     ]
                 }
             ]}
            />
            
        </div>
     );
}
 
export default Pie;