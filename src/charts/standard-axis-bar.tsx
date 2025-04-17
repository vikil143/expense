import { StyleSheet } from 'react-native'
import React from 'react'
import Svg, { G, Line, Text } from 'react-native-svg'
import * as d3Scale from 'd3-scale'
import AnimatedLine from './components/animated-line';
import { BarData, padding } from './dummy-data';
import { SCREEN_WIDTH } from '@myapp/utilities/common-data';
import { HasChidren } from '@myapp/utilities/common-types';
import moment from 'moment';

interface StandardAxisProps<T> extends HasChidren {
  // data: T[]; // Data to be used for the axis
  // x: T;
  // y: T;
  xScale: d3Scale.ScaleBand<number, number>;
  yScale: d3Scale.ScaleLinear<number, number>;
  width: number;
  height: number;
  xTick?: number;
  yTick?: number;
  showHLine?: boolean;
  data: BarData[];
} 

export default function StandardAxisBar<T>({ xScale, yScale, children, height, width, xTick = 5, yTick = 5, showHLine = false }: StandardAxisProps<T>) {
  // const xTicks = xScale.ticks(xTick); // Adjust the number of ticks as needed
  const yTicks = yScale.ticks(yTick); // Adjust the number of ticks as needed

  // console.log("xTicks", xTicks)
  console.log("yTicks", yTicks)
  return (
    <>
    {/* <AnimatedLine /> */}
      {/* X-Axis */}
      <G transform={`translate(0, ${height})`}>
        {xScale.domain().map((tick, i) => {
          const x = xScale(tick);
          console.log("x", x)
          console.log("tick", tick)
          return (
          <G key={i} x={x} y={0}>
            <G 
              x={xScale.bandwidth() / 2}>
            <Line  y2={6} stroke="black" />
            <Text
              y={20}
              fontSize={10}
              fill="black"
              textAnchor="middle"
            >
                {tick}
            </Text>
            </G>
          </G>
        )})}
      </G>

      <G transform={`translate(${0}, 0)`}>
        {children}
      </G>

      {/* Y-Axis */}
      <G transform={`translate(0, 0)`}>
        {yTicks.map((tick, i) => (
          <G key={i} x={0} y={yScale(tick)}>
            <Line x2={-6} stroke="black" />
            <Line x2={width} 
              stroke="black" 
              strokeWidth={1} 
              strokeDasharray="5,5"
              strokeOpacity={0.5} 
            />
            <Text
              x={-10}
              dy={4}
              fontSize={10}
              fill="black"
              textAnchor="end"
            >
              {tick}
            </Text>
          </G>
        ))}
      </G>
    </>
  )
}

const styles = StyleSheet.create({})