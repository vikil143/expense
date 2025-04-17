import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Appbar } from "react-native-paper"
import { commonStyles } from '@myapp/utilities/common-styles'
import FABPayInit from '@myapp/components/fab-pay-Init'
import { RootStackScreenProps } from '@myapp/routes/types'
import PieGroup from '@myapp/charts-group/pie-group';
import BarGroup from '@myapp/charts-group/bar-group';
import LineGroup from '@myapp/charts-group/line-group';
import CustMenu from '@myapp/components/menu'
import Loader from '@myapp/components/loader'

interface DashboardScreenProps extends RootStackScreenProps<"Dashboard"> {}


// Component wise approach
export default function DashboardScreen({ navigation } : DashboardScreenProps) {
  const [typeOfChart, setTypeOfChart] = useState("Line");
  const timer = useRef<NodeJS.Timeout | null>(null);

  const toggleGraph = (type: string) => {
    setTypeOfChart("Unknow");
    if(timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setTypeOfChart(type);
      timer.current = null
    }, 2000)
  }

  const handlePress = () => {
    navigation.navigate("Scanner")
  }
  return (
    <View style={[commonStyles.container]}>
      <Appbar>
        <Appbar.Content title="Tracker" />
      </Appbar>
      <View style={[commonStyles.container]}>
        <View style={[commonStyles.rowAlignEnd, commonStyles.pA15]}>
          <CustMenu onPress={toggleGraph} />
        </View>
        {(() => {
          if(typeOfChart === "Line") {
            return <LineGroup />
          }else if(typeOfChart === "Bar") {
            return <BarGroup />
          }else if(typeOfChart === "Pie") {
            return <PieGroup />
          }else {
            return <Loader />
          }
        })()}
      </View>
      <FABPayInit onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({})