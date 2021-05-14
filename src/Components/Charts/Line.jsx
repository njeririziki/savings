import React from 'react';
import { ResponsiveLine } from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data =[
    {
      "id": "japan",
      "color": "hsl(249, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 289
        },
        {
          "x": "helicopter",
          "y": 154
        },
        {
          "x": "boat",
          "y": 53
        },
        {
          "x": "train",
          "y": 72
        },
        {
          "x": "subway",
          "y": 145
        },
        {
          "x": "bus",
          "y": 36
        },
        {
          "x": "car",
          "y": 185
        },
        {
          "x": "moto",
          "y": 63
        },
        {
          "x": "bicycle",
          "y": 172
        },
        {
          "x": "horse",
          "y": 262
        },
        {
          "x": "skateboard",
          "y": 183
        },
        {
          "x": "others",
          "y": 280
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(152, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 167
        },
        {
          "x": "helicopter",
          "y": 238
        },
        {
          "x": "boat",
          "y": 12
        },
        {
          "x": "train",
          "y": 36
        },
        {
          "x": "subway",
          "y": 65
        },
        {
          "x": "bus",
          "y": 185
        },
        {
          "x": "car",
          "y": 177
        },
        {
          "x": "moto",
          "y": 192
        },
        {
          "x": "bicycle",
          "y": 217
        },
        {
          "x": "horse",
          "y": 144
        },
        {
          "x": "skateboard",
          "y": 103
        },
        {
          "x": "others",
          "y": 258
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(240, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 290
        },
        {
          "x": "helicopter",
          "y": 71
        },
        {
          "x": "boat",
          "y": 133
        },
        {
          "x": "train",
          "y": 197
        },
        {
          "x": "subway",
          "y": 161
        },
        {
          "x": "bus",
          "y": 218
        },
        {
          "x": "car",
          "y": 110
        },
        {
          "x": "moto",
          "y": 112
        },
        {
          "x": "bicycle",
          "y": 130
        },
        {
          "x": "horse",
          "y": 130
        },
        {
          "x": "skateboard",
          "y": 193
        },
        {
          "x": "others",
          "y": 263
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(200, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 245
        },
        {
          "x": "helicopter",
          "y": 133
        },
        {
          "x": "boat",
          "y": 45
        },
        {
          "x": "train",
          "y": 24
        },
        {
          "x": "subway",
          "y": 39
        },
        {
          "x": "bus",
          "y": 78
        },
        {
          "x": "car",
          "y": 1
        },
        {
          "x": "moto",
          "y": 278
        },
        {
          "x": "bicycle",
          "y": 205
        },
        {
          "x": "horse",
          "y": 4
        },
        {
          "x": "skateboard",
          "y": 231
        },
        {
          "x": "others",
          "y": 190
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(336, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 234
        },
        {
          "x": "helicopter",
          "y": 145
        },
        {
          "x": "boat",
          "y": 13
        },
        {
          "x": "train",
          "y": 140
        },
        {
          "x": "subway",
          "y": 7
        },
        {
          "x": "bus",
          "y": 199
        },
        {
          "x": "car",
          "y": 262
        },
        {
          "x": "moto",
          "y": 300
        },
        {
          "x": "bicycle",
          "y": 197
        },
        {
          "x": "horse",
          "y": 178
        },
        {
          "x": "skateboard",
          "y": 249
        },
        {
          "x": "others",
          "y": 104
        }
      ]
    }
  ]
const ActivityLine = () => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
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
)

export default ActivityLine;