import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Wave } from 'react-native-animated-spinkit';

import { commonStyles } from '@myapp/utilities/common-styles';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@myapp/utilities/common-data';

export function Loader() {
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

export const LoaderWithText = ({ text = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <Wave size={80} color="#4CAF50" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
})