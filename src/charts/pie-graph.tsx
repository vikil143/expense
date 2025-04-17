import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { G, Path, Text } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const RADIUS = width / 4;

const AnimatedG = Animated.createAnimatedComponent(G);

interface PieGraphProps {
    focusedCategory: string | null;
    setFocusedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    colorScale?: d3Scale.ScaleOrdinal<string, string, never>;
    data: Array<{ category: string; amount: number }>;
}
export default function PieGraph({ data, focusedCategory, setFocusedCategory, colorScale }: PieGraphProps) {

  const pieGenerator = d3Shape.pie<any>().value(d => d.amount);
  const arcGenerator = d3Shape.arc().outerRadius(RADIUS).innerRadius(0).padAngle(0.02);

  return (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Svg width={width} height={width}>
        <G x={width / 2} y={width / 2}>
          {pieGenerator(data).map((arcData, index) => {
            const isFocused = arcData.data.category === focusedCategory;
            const scale = useSharedValue(isFocused ? 1.2 : 1);

            // Animate on focus change
            scale.value = withTiming(isFocused ? 1.2 : 1, { duration: 300 });

            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: scale.value }],
            }));

            return (
              <AnimatedG
                key={index}
                style={animatedStyle}
                onPress={() => {
                  setFocusedCategory(prev =>
                    prev === arcData.data.category ? null : arcData.data.category
                  );
                }}
              >
                <Path
                  d={arcGenerator(arcData) as string}
                  fill={colorScale(arcData.data.category)}
                />
              </AnimatedG>
            );
          })}
          {focusedCategory && (
            <Text
              x={0}
              y={0}
              textAnchor="middle"
              fontSize={16}
              fill="#000"
              fontWeight="bold"
            >
              ₹{data.find(d => d.category === focusedCategory)?.amount}
            </Text>
          )}
        </G>
      </Svg>
    </View>
  );
}
