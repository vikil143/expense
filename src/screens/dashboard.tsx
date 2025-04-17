import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import Svg, { G, Rect } from 'react-native-svg'
import moment from 'moment';
import { Appbar } from "react-native-paper"
import * as d3Scale from 'd3-scale'
import * as d3Array from 'd3-array'
import { commonStyles } from '@myapp/utilities/common-styles'
import FABPayInit from '@myapp/components/fab-pay-Init'
import { RootStackScreenProps } from '@myapp/routes/types'
import { lineDataOfGPay, padding, LineData, lineDataOfPhonePay, lineGraphDimension, lineDataOfPytm } from '@myapp/charts/dummy-data'
import StandardAxis from '@myapp/charts/standard-axis'
import { SCREEN_WIDTH } from '@myapp/utilities/common-data'
import AnimatedLine from '@myapp/charts/components/animated-line';

interface DashboardScreenProps extends RootStackScreenProps<"Dashboard"> {}


// Component wise approach
export default function DashboardScreen({ navigation } : DashboardScreenProps) {
  const parsedDataGpay = useMemo(() => {
    const parsed = lineDataOfGPay.map((item) => {
      // Use moment.js to parse the date
      // const date = moment(item.date, 'YYYY-MM-DD').toDate();  // Convert to Date object
      const date = item.date
  
      // Check for invalid date
      if (!moment(date).isValid()) {
        console.warn(`Invalid date: ${item.date}`);
        return null;
      }
  
      return {
        x: date,
        y: item.amount,
      };
    }).filter(item => item !== null);
  
    console.log("Parsed Data:", parsed);
    return parsed;
  }, [lineDataOfGPay]);

  
  const parsedDataPhonePay = useMemo(() => {
    const parsed = lineDataOfPhonePay.map((item) => {
      // Use moment.js to parse the date
      // const date = moment(item.date, 'YYYY-MM-DD').toDate();  // Convert to Date object
      const date = item.date
  
      // Check for invalid date
      if (!moment(date).isValid()) {
        console.warn(`Invalid date: ${item.date}`);
        return null;
      }
  
      return {
        x: date,
        y: item.amount,
      };
    }).filter(item => item !== null);
  
    console.log("Parsed Data:", parsed);
    return parsed;
  }, [lineDataOfPhonePay]);

  
  const parsedDataPytm = useMemo(() => {
    const parsed = lineDataOfPytm.map((item) => {
      // Use moment.js to parse the date
      // const date = moment(item.date, 'YYYY-MM-DD').toDate();  // Convert to Date object
      const date = item.date
  
      // Check for invalid date
      if (!moment(date).isValid()) {
        console.warn(`Invalid date: ${item.date}`);
        return null;
      }
  
      return {
        x: date,
        y: item.amount,
      };
    }).filter(item => item !== null);
  
    console.log("Parsed Data:", parsed);
    return parsed;
  }, [lineDataOfPytm]);
  
  

// // x and y scale
// const xScale = d3Scale
//   .scaleTime()
//   .domain(d3Array.extent(parsedData, (d) => d.x) as [Date, Date]) // Use parsed date
//   .range([0, SCREEN_WIDTH + padding.left + padding.right])

// const yScale = d3Scale
//   .scaleLinear()
//   .domain([0, d3Array.max(parsedData, (d) => d.y) as number])
//   .range([SCREEN_WIDTH + padding.top + padding.bottom, 0])

  
// x and y scale
const xScaleGpay = d3Scale
.scaleTime()
.domain(d3Array.extent(parsedDataGpay, (d) => d.x) as [Date, Date]) // Use parsed date
.range([0, lineGraphDimension.width])

const yScaleGpay = d3Scale
.scaleLinear()
.domain([0, d3Array.max(parsedDataGpay, (d) => d.y) as number])
.range([lineGraphDimension.height, 0])


// x and y scale
const xScalePhonePay = d3Scale
.scaleTime()
.domain(d3Array.extent(parsedDataPhonePay, (d) => d.x) as [Date, Date]) // Use parsed date
.range([0, lineGraphDimension.width])

const yScalePhonePay = d3Scale
.scaleLinear()
.domain([0, d3Array.max(parsedDataPhonePay, (d) => d.y) as number])
.range([lineGraphDimension.height, 0])


// x and y scale
const xScalePytm = d3Scale
.scaleTime()
.domain(d3Array.extent(parsedDataPytm, (d) => d.x) as [Date, Date]) // Use parsed date
.range([0, lineGraphDimension.width])

const yScalePytm = d3Scale
.scaleLinear()
.domain([0, d3Array.max(parsedDataPytm, (d) => d.y) as number])
.range([lineGraphDimension.height, 0])



  const handlePress = () => {
    navigation.navigate("Scanner")
  }

  console.log("dashboard screen", lineDataOfGPay, lineDataOfPhonePay)

  return (
    <View style={[commonStyles.container]}>
      <Appbar>
        <Appbar.Content title="Tracker" />
      </Appbar>
      <View style={[commonStyles.container]}>
      <View style={{ padding: 10 }} />
      <Svg width={SCREEN_WIDTH} height={SCREEN_WIDTH}>
        <G transform={`translate(${padding.left}, ${padding.top})`} color={"orange"}>
          <StandardAxis yTick={7} xScale={xScaleGpay} yScale={yScaleGpay} width={lineGraphDimension.width} height={lineGraphDimension.height}>
            <>
              <G>
                <AnimatedLine
                  data={parsedDataGpay}
                  x="x"
                  y="y"
                  xScale={xScaleGpay}
                  yScale={yScaleGpay}
                />
              </G>
              <G>
                <AnimatedLine
                  data={parsedDataPhonePay}
                  x="x"
                  y="y"
                  stokeColor='red'
                  xScale={xScalePhonePay}
                  yScale={yScalePhonePay}
                />
              </G>
              <G>
                <AnimatedLine
                  data={parsedDataPytm}
                  x="x"
                  y="y"
                  stokeColor='orange'
                  xScale={xScalePytm}
                  yScale={yScalePytm}
                />
              </G>
            </>
          </StandardAxis>
        </G>
        <Rect
          x={padding.left}
          y={padding.top}
          width={lineGraphDimension.width}
          height={lineGraphDimension.height}
          fill="none"
          stroke="black"
          strokeWidth={1}
          strokeDasharray="5,5"
          strokeOpacity={0.5}
        />
      </Svg>
      </View>
      <FABPayInit onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({})