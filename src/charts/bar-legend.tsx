import { StyleSheet, View, Text } from "react-native";
import * as d3Scale from 'd3-scale';
import { BarData } from "./dummy-data";

interface BarLegendProps {
    colorScale?: d3Scale.ScaleOrdinal<string, string, never>;
    data: BarData[];
}

const BarLegend = ({ data, colorScale }: BarLegendProps) => {
    return (
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorDot, { backgroundColor: colorScale(item.category) }]} />
            <Text style={styles.label}>{item.category}</Text>
          </View>
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    legendContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 12,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 8,
      marginVertical: 4,
    },
    colorDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 6,
    },
    label: {
      fontSize: 13,
      color: '#333',
    },
  });
  
  export default BarLegend;