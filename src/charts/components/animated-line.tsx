import React, { useEffect, useRef, useState } from 'react';
import Animated, {  interpolate, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
// import {} from 'd3-axis';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedLineProps<T> {
    data: T[];
    x: keyof T;
    y: keyof T;
    xScale: d3Scale.ScaleTime<number, number>;
    yScale: d3Scale.ScaleLinear<number, number>;
    stokeColor?: string;
}

const AnimatedLine = <T,>({ data, x, y, xScale, yScale, stokeColor = "blue" }: AnimatedLineProps<T>) => {
    const pathRef = useRef<any>(null);
    const [pathLength, setPathLength] = useState(0);
    const animationProgress = useSharedValue(0);
  
    // const lineData = [
    //   { x: 0, y: 0 },
    //   { x: 50, y: 100 },
    //   { x: 100, y: 50 },
    //   { x: 150, y: 150 },
    //   { x: 200, y: 0 },
    // ];
  
    const lineGenerator = d3Shape.line()
      .x(d => xScale(d[x]))
      .y(d => yScale(d[y]))
      .curve(d3Shape.curveMonotoneX); // Use curveMonotoneX for smooth curves
  
    const linePath = lineGenerator(data);
  
    // Calculate the total length of the path
    // const pathLength = d3Path.path();
    // pathLength.moveTo(0, 0);
    // lineData.forEach((point, index) => {
    //   if (index === 0) return;
    //   pathLength.lineTo(point.x, point.y);
    // });
  
    // const totalLength = pathLength.length;
  
    const animatedProps = useAnimatedProps(() => {
        const strokeDashoffset = interpolate(animationProgress.value, [0, 1], [pathLength, 0]);
        return {
          strokeDashoffset,
          opacity: interpolate(animationProgress.value, [0, 1], [0, 1]),
        };
      });

    useEffect(() => {
        if (pathRef.current) {
            // This will get total length of the path
            // and set it to pathLength variable
            const length = pathRef.current.getTotalLength();
            setPathLength(length);
        }
        animationProgress.value = withTiming(1, { duration: 1500 });
    }, []);


    /*
        Below code is working line path animation
        Here only thing need to done thats to calculate the length of the path 
        and set it to totalLength variable
    */
//   const pathData = 'M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80'; // Bezier curve example
//   const totalLength = 300; // You can calculate real length using a lib or manually if known

//   const progress = useSharedValue(0);

//   const animatedProps = useAnimatedProps(() => {
//     return {
//       strokeDashoffset: interpolate(progress.value, [0, 1], [totalLength, 0]),
//     };
//   });

//   useEffect(() => {
//     progress.value = withTiming(1, { duration: 2000 });
//   }, []);

  return (
    <AnimatedPath 
        ref={pathRef}
        d={linePath}
        fill="none"
        stroke={stokeColor}
        strokeWidth="2" 
        strokeDasharray={pathLength}
        animatedProps={animatedProps}
    />
  );
};

export default AnimatedLine;
