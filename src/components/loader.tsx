import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Loader() {
  return (
    <View>
        <View style={{ padding: 30, backgroundColor: "#ddd" }} />
        <View style={{ padding: 10 }} />
        <View style={{ padding: 250, backgroundColor: "#ddd" }} />
    </View>
  )
}

const styles = StyleSheet.create({})