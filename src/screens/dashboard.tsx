import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, FAB } from "react-native-paper"
import { commonStyles } from '@myapp/utilities/common-styles'
import FABPayInit from '@myapp/components/fab-pay-Init'
import { RootStackScreenProps } from '@myapp/routes/types'

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
      <FABPayInit onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({})