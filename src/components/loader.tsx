import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { commonStyles } from '@myapp/utilities/common-styles';
import { SCREEN_WIDTH } from '@myapp/utilities/common-data';

export default function Loader() {
  const width = SCREEN_WIDTH - 20 - 20
  return (
    <View style={[commonStyles.pA20]}>
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item width={width} height={60} />
            <SkeletonPlaceholder.Item marginTop={6} width={width} height={250} />
            <SkeletonPlaceholder.Item marginTop={6} width={width} height={60} />
            <SkeletonPlaceholder.Item marginTop={6} width={width} height={150} />
        </SkeletonPlaceholder>
    </View>
  )
}

const styles = StyleSheet.create({})