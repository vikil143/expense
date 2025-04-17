import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar } from "react-native-paper"
import { commonStyles } from '@myapp/utilities/common-styles'
import FABPayInit from '@myapp/components/fab-pay-Init'
import { RootStackScreenProps } from '@myapp/routes/types'
import PieGroup from '@myapp/charts-group/pie-group';
import BarGroup from '@myapp/charts-group/bar-group';
import LineGroup from '@myapp/charts-group/line-group';

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
        <BarGroup />
      </View>
      <FABPayInit onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({})