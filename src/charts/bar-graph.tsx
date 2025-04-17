import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import moment from 'moment'
import { G, Rect } from 'react-native-svg'
import * as d3Scale from 'd3-scale'
import * as d3Array from 'd3-array'
import { barData, barGraphDimension, lineGraphDimension, padding } from './dummy-data'
import StandardAxisBar from './standard-axis-bar'

export default function BarGraph() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const parsedDataGpay = useMemo(() => {
        const parsed = barData.map((item) => {

        
            return {
                x: item.category,
                y: item.amount,
            };
        });
        
        console.log("Parsed Data:", parsed);
        return parsed;
    }, [barData]);

const xScale = d3Scale.scaleBand()
  .domain(parsedDataGpay.map(d => d.x))
  .range([0, barGraphDimension.width])
  .padding(0.2);

const yScale = d3Scale.scaleLinear()
  .domain([0, d3Array.max(parsedDataGpay, d => d.y)!])
  .range([barGraphDimension.height, 0]);


  return (
    <>
    
        <Rect
            x={padding.left}
            y={padding.top}
            width={barGraphDimension.width}
            height={barGraphDimension.height}
            fill="none"
            stroke="black"
            strokeWidth={1}
            strokeDasharray="5,5"
            strokeOpacity={0.5}
        />
        <G transform={`translate(${padding.left}, ${padding.top})`}>
            <StandardAxisBar data={barData} yTick={7} xScale={xScale} yScale={yScale} width={lineGraphDimension.width} height={lineGraphDimension.height}>
                <>
                {barData.map((d, i) => (
                    <Rect
                        key={i}
                        x={xScale(d.category)}
                        y={yScale(d.amount)}
                        width={xScale.bandwidth()}
                        height={barGraphDimension.height - yScale(d.amount)}
                        fill={selectedIndex === i ? 'orange' : '#6a1b9a'}
                        onPress={() => selectedIndex === i ? setSelectedIndex(null) : setSelectedIndex(i)}
                    />
                    ))}
                </>
            </StandardAxisBar>
        </G>
        
    </>
  )
}

const styles = StyleSheet.create({})