import { View, Text, StyleSheet } from 'react-native';
import * as d3Scale from 'd3-scale';

interface PieLegendProps {
    colorScale?: d3Scale.ScaleOrdinal<string, string, never>;
    focusedCategory: string | null;
    data: Array<{ category: string; amount: number }>;
}

const PieLegend = ({ data, colorScale, focusedCategory }: PieLegendProps) => {
  return (
    <View style={styles.legendContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View
            style={[
              styles.colorBox,
              {
                backgroundColor: colorScale(item.category),
                opacity: focusedCategory && focusedCategory !== item.category ? 0.3 : 1,
              },
            ]}
          />
          <Text style={styles.label}>
            {item.category} - ₹{item.amount}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  colorBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
});

export default PieLegend;