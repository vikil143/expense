import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as d3Scale from 'd3-scale';
import PieGraph from '@myapp/charts/pie-graph'
import { SCREEN_WIDTH } from '@myapp/utilities/common-data'
import Svg from 'react-native-svg'
import PieLegend from '@myapp/charts/pie-legend'

const data = [
  { category: 'Food', amount: 120 },
  { category: 'Travel', amount: 90 },
  { category: 'Groceries', amount: 150 },
  { category: 'Rent', amount: 200 },
  { category: 'Entertainment', amount: 70 },
];

const colorScale = d3Scale
  .scaleOrdinal<string>()
  .domain(data.map(d => d.category))
  .range(['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff']);

export default function PieGroup() {
      const [focusedCategory, setFocusedCategory] = useState<string | null>(null);

  return (
    <View>
        <PieLegend
            data={data}
            colorScale={colorScale}
            focusedCategory={focusedCategory}
        />

        <Svg width={SCREEN_WIDTH} height={SCREEN_WIDTH}>
            <PieGraph {...{ data, focusedCategory, setFocusedCategory, colorScale }} />
        </Svg>
    </View>
  )
}

const styles = StyleSheet.create({})