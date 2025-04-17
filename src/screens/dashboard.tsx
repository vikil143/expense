import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import Svg, { G, Rect } from 'react-native-svg'
import moment from 'moment';
import { Appbar } from "react-native-paper"
import { commonStyles } from '@myapp/utilities/common-styles'
import FABPayInit from '@myapp/components/fab-pay-Init'
import { RootStackScreenProps } from '@myapp/routes/types'
import { lineDataOfGPay, padding, LineData, lineDataOfPhonePay, lineGraphDimension, lineDataOfPytm } from '@myapp/charts/dummy-data'
import StandardAxis from '@myapp/charts/standard-axis'
import { SCREEN_WIDTH } from '@myapp/utilities/common-data'
import AnimatedLine from '@myapp/charts/components/animated-line';
import LineGraph from '@myapp/charts/line-graph';

interface DashboardScreenProps extends RootStackScreenProps<"Dashboard"> {}


// Component wise approach
export default function DashboardScreen({ navigation } : DashboardScreenProps) {


  const handlePress = () => {
    navigation.navigate("Scanner")
  }

  return (
    <View style={[commonStyles.container]}>
      <Appbar>
        <Appbar.Content title="Tracker" />
      </Appbar>
      <View style={[commonStyles.container]}>
      <View style={{ padding: 10 }} />
      <Svg width={SCREEN_WIDTH} height={SCREEN_WIDTH}>
        {/* <LineGraph /> */}
      </Svg>
      </View>
      <FABPayInit onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({})