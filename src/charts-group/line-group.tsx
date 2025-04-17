import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SCREEN_WIDTH } from '@myapp/utilities/common-data'
import Svg from 'react-native-svg'
import { typeOfPay } from '@myapp/charts/dummy-data';
import LineGraph from '@myapp/charts/line-graph';
import LineLegend from '@myapp/charts/line-legends';

export default function LineGroup() {
  return (
    <View>
        <LineLegend lines={typeOfPay} />
        <Svg width={SCREEN_WIDTH} height={SCREEN_WIDTH}>
            <LineGraph />
        </Svg>
    </View>
  )
}

const styles = StyleSheet.create({})