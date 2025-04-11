import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, FAB } from "react-native-paper"
import { commonStyles } from '@myapp/utilities/common-styles'
import FABPayInit from '@myapp/components/fab-pay-Init'

// Component wise approach
export default function DashboardScreen() {
  return (
    <View style={[commonStyles.container]}>
      <Appbar>
        <Appbar.Content title="Tracker" />
      </Appbar>
      <FABPayInit />
    </View>
  )
}

const styles = StyleSheet.create({})