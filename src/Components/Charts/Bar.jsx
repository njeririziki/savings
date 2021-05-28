import React from 'react';

import { ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data= [
    {
      "country": "AD",
      "food": 102,
      "foodColor": "hsl(342, 70%, 50%)",
      "water": 200,
      "waterColor": "hsl(104, 70%, 50%)",
      "electricity": 76,
      "electricityColor": "hsl(195, 70%, 50%)",
      "clothes": 7,
      "clothesColor": "hsl(91, 70%, 50%)",
      "subs": 114,
      "subsColor": "hsl(51, 70%, 50%)",
      "donut": 48,
      "donutColor": "hsl(41, 70%, 50%)"
    },
    {
      "country": "AE",
      "food": 2,
      "foodColor": "hsl(342, 70%, 50%)",
      "water": 56,
      "waterColor": "hsl(104, 70%, 50%)",
      "electricity": 147,
      "electricityColor": "hsl(209, 70%, 50%)",
      "clothes": 18,
      "clothesColor": "hsl(146, 70%, 50%)",
      "subs": 127,
      "subsColor": "hsl(168, 70%, 50%)",
      "donut": 164,
      "donutColor": "hsl(96, 70%, 50%)"
    },
    {
      "country": "AF",
      "food": 47,
      "foodColor": "hsl(342, 70%, 50%)",
      "water": 75,
      "waterColor": "hsl(104, 70%, 50%)",
      "electricity": 14,
      "electricityColor": "hsl(329, 70%, 50%)",
      "clothes": 5,
      "clothesColor": "hsl(211, 70%, 50%)",
      "subs": 188,
      "subsColor": "hsl(230, 70%, 50%)",
      "donut": 186,
      "donutColor": "hsl(246, 70%, 50%)"
    },
    {
      "country": "AG",
      "food": 2,
      "foodColor": "hsl(342, 70%, 50%)", 
      "water": 180,
      "waterColor": "hsl(104, 70%, 50%)",
      "electricity": 2,
      "electricityColor": "hsl(285, 70%, 50%)",
      "clothes": 121,
      "clothesColor": "hsl(257, 70%, 50%)",
      "subs": 110,
      "subsColor": "hsl(318, 70%, 50%)",
      "donut": 63,
      "donutColor": "hsl(334, 70%, 50%)"
    },
   
  ]
const MyResponsiveBar = () => (
    <div style={{height:'370px', width:'580px'}}>
    <ResponsiveBar
        data={data}
        keys={[ 'food', 'water', 'electricity', 'transport', 'clothes','subs', 'donut' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'red_blue' }}
        // defs={[
        //     {
        //         id: 'dots',
        //         type: 'patternDots',
        //         background: 'inherit',
        //         color: '#38bcb2',
        //         size: 4,
        //         padding: 1,
        //         stagger: true
        //     },
        //     {
        //         id: 'lines',
        //         type: 'patternLines',
        //         background: 'inherit',
        //         color: '#eed312',
        //         rotation: -45,
        //         lineWidth: 6,
        //         spacing: 10
        //     }
        // ]}
        // fill={[
        //     {
        //         match: {
        //             id: 'food'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'water'
        //         },
        //         id: 'lines'
        //     }
        // ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'expenses',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
    </div>
)

export default MyResponsiveBar;