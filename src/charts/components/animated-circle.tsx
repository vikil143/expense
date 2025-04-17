import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import * as d3 from 'd3';

const AnimatedCircle = () => {
  const svgRef = useRef(null);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    // Set the initial radius for the circle
    setRadius(10);

    // Animate the radius from 10 to 100
    d3.select(svgRef.current)
      .select('circle')
      .transition()
      .duration(2000)
      .attr('r', 100) // Final radius after animation
      .on('end', () => {
        // Reset the radius back to initial state
        setRadius(10);
      });
  }, []);

  return (
    <View>
      <Svg width="200" height="200" ref={svgRef}>
        <Circle cx="100" cy="100" r={radius} fill="blue" />
      </Svg>
    </View>
  );
};

export default AnimatedCircle;
