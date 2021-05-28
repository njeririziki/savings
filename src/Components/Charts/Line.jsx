import React from 'react';
import { ResponsiveLine } from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const linedata =[
    {
      id: "japan",
      color: "#34515e",
      data: [
        {
          "x": "food",
          "y": 289
        },
        {
          "x": "transport",
          "y": 154
        },
        {
          "x": "electricity",
          "y": 53
        },
        {
          "x": "water",
          "y": 72
        },
        {
          "x": "subscriprtions",
          "y": 145
        },
       
        {
          "x": "others",
          "y": 280
        }
      ]
    },
  
    {
      id: "norway",
      color: "#a00037",
      data: [
        {
          "x": "food",
          "y": 234
        },
        {
          "x": "transport",
          "y": 145
        },
        {
          "x": "electricity",
          "y": 13
        },
        {
          "x": "water",
          "y": 140
        },
        {
          "x": "subscriprtions",
          "y": 7
        },
       
        {
          "x": "others",
          "y": 104
        },
        
      ]
    }
  ]
const ActivityLine = () => (
  <div style={{height:'370px', width:'580px'}}>
    <ResponsiveLine
        data={linedata}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        colors= { {  datum: 'color' }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Expenses',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'amount',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
)

export default ActivityLine;