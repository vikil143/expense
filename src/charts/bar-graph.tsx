import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import { G, Rect } from 'react-native-svg'
import * as d3Scale from 'd3-scale'
import * as d3Array from 'd3-array'
import { barData, barGraphDimension, padding } from './dummy-data'
import StandardAxisBar from './standard-axis-bar'

const AnimatedRect = Animated.createAnimatedComponent(Rect);


interface BarGraphProps {
    colorScale?: d3Scale.ScaleOrdinal<string, string, never>;
}

export default function BarGraph({ colorScale }: BarGraphProps) {
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
            <StandardAxisBar data={barData} yTick={7} xScale={xScale} yScale={yScale} width={barGraphDimension.width} height={barGraphDimension.height}>
                <>
                {barData.map((d, i) => {
                    
                    const x = xScale(d.category)!;
                    const finalHeight = barGraphDimension.height - yScale(d.amount);
                    const animatedHeight = useSharedValue(0);
                    const animatedY = useSharedValue(barGraphDimension.height);

                    const animatedProps = useAnimatedProps(() => ({
                        height: animatedHeight.value,
                        y: animatedY.value,
                    }));

                    useEffect(() => {
                        animatedHeight.value = withTiming(finalHeight, { duration: 1000 });
                        animatedY.value = withTiming(yScale(d.amount), { duration: 1000 });
                    }, []);
                    return (
                        <AnimatedRect
                            key={i}
                            x={xScale(d.category)}
                            width={xScale.bandwidth()}
                            // y={yScale(d.amount)}
                            // height={barGraphDimension.height - yScale(d.amount)}
                            fill={selectedIndex === i ? '#000' : colorScale(d.category)}
                            onPress={() => selectedIndex === i ? setSelectedIndex(null) : setSelectedIndex(i)}
                            animatedProps={animatedProps}
                        />
                    )})}
                </>
            </StandardAxisBar>
        </G>
        
    </>
  )
}

const styles = StyleSheet.create({})