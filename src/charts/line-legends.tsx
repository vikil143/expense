import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TypeOfPay } from './dummy-data';

type LineLegendProps = {
  lines: TypeOfPay[];
};

const LineLegend: React.FC<LineLegendProps> = ({ lines }) => {
  return (
    <View style={styles.legendContainer}>
      {lines.map((category) => (
        <View key={category.name} style={styles.legendItem}>
          <View
            style={[
              styles.lineBox,
              { backgroundColor: category.color },
            ]}
          />
          <Text style={styles.label}>{category.name}</Text>
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
    paddingHorizontal: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 6,
  },
  lineBox: {
    width: 14,
    height: 4,
    borderRadius: 2,
    marginRight: 6,
  },
  label: {
    fontSize: 13,
    color: '#333',
  },
});

export default LineLegend;
