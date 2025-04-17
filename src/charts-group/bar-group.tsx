import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as d3Scale from 'd3-scale';
import PieGraph from '@myapp/charts/pie-graph'
import { SCREEN_WIDTH } from '@myapp/utilities/common-data'
import Svg from 'react-native-svg'
import PieLegend from '@myapp/charts/pie-legend'
import BarGraph from '@myapp/charts/bar-graph';
import BarLegend from '@myapp/charts/bar-legend';
import { barData, COLORS } from '@myapp/charts/dummy-data';

const colorScale = d3Scale
  .scaleOrdinal<string>()
  .domain(barData.map(d => d.category))
  .range(COLORS);

export default function BarGroup() {
  return (
    <View>
        <BarLegend data={barData} colorScale={colorScale} />
        <Svg width={SCREEN_WIDTH} height={SCREEN_WIDTH}>
            <BarGraph colorScale={colorScale} />
        </Svg>
    </View>
  )
}

const styles = StyleSheet.create({})