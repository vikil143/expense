import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import { COLORS, data, PieData } from './dummy-data';

const radius = 120;

const SpendingPieChart = () => {
  const [selected, setSelected] = useState<PieData | null>(null);

  const pieData = d3Shape.pie<any, PieData>()
    .value(d => d.amount)(data);

  const arcGen = d3Shape.arc()
    .outerRadius(radius)
    .innerRadius(50);

  const colorScale = d3Scale.scaleOrdinal()
    .domain(data.map(d => d.category))
    .range(COLORS);

  return (
    <View style={{ alignItems: 'center', marginTop: 30 }}>
      <Svg width={300} height={300}>
        <G x={150} y={150}>
          {pieData.map((slice, index) => {
            const path = arcGen(slice);
            return (
              <TouchableOpacity key={index} onPress={() => setSelected(slice.data)}>
                <Path
                  d={path}
                  fill={colorScale(slice.data.category)}
                  stroke="#fff"
                  strokeWidth={2}
                />
              </TouchableOpacity>
            );
          })}
        </G>
      </Svg>

      {selected && (
        <View style={{ marginTop: 20, backgroundColor: '#eee', padding: 10, borderRadius: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            ₹{selected.amount} spent on {selected.category}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SpendingPieChart;
