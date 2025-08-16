import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Svg, { Path, G, Circle, Text as SvgText, Defs, LinearGradient, Stop } from "react-native-svg";
import * as d3 from "d3-shape";
import { scaleTime, scaleLinear } from "d3-scale";
import { extent, max } from "d3-array";
import { timeFormat } from "d3-time-format";
import { Transaction } from "@myapp/storage/db";

const { width } = Dimensions.get("window");
const height = 250;

const graphs = {
  margin: { top: 20, right: 10, bottom: 30, left: 30 },
  width: width - 40,
  height: height - 40,
};

interface DashboardLineChartProps {
  transactions: Transaction[];
}

const DashboardLineChart: React.FC<DashboardLineChartProps> = ({ transactions }) => {
  // ✅ Step 1: Filter last 7 days
  const today = new Date();
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 6);

  const filtered = transactions.filter(
    (t) => t.date >= last7Days && t.date <= today
  );

  // ✅ Step 2: Group by day & sum amounts
  const dailyTotals: { date: Date; value: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(last7Days);
    day.setDate(last7Days.getDate() + i);

    const total = filtered
      .filter((t) => t.date.toDateString() === day.toDateString())
      .reduce((sum, t) => sum + t.amount, 0);

    dailyTotals.push({ date: day, value: total });
  }

  // ✅ Step 3: Create scales
  const xScale = scaleTime()
    .domain(extent(dailyTotals, (d) => d.date) as [Date, Date])
    .range([graphs.margin.left, graphs.width - graphs.margin.right]);

  const yScale = scaleLinear()
    .domain([0, max(dailyTotals, (d) => d.value) || 100])
    .nice()
    .range([graphs.height - graphs.margin.bottom, graphs.margin.top]);

  // ✅ Step 4: Create D3 paths
  const area = d3
    .area<{ date: Date; value: number }>()
    .x((d) => xScale(d.date))
    .y0(graphs.height - graphs.margin.bottom)
    .y1((d) => yScale(d.value))
    .curve(d3.curveMonotoneX);

  const line = d3
    .line<{ date: Date; value: number }>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(d3.curveMonotoneX);

  const weekFormat = timeFormat("%a");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Last 7 Days Transactions</Text>
      <Svg width={graphs.width} height={graphs.height}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#4F46E5" stopOpacity={0.4} />
            <Stop offset="100%" stopColor="#4F46E5" stopOpacity={0.05} />
          </LinearGradient>
        </Defs>

        {/* Gradient Area */}
        <Path d={area(dailyTotals) || ""} fill="url(#gradient)" />

        {/* Line Path */}
        <Path d={line(dailyTotals) || ""} stroke="#4F46E5" strokeWidth={3} fill="none" />

        {/* Dots + Labels */}
        {dailyTotals.map((d, i) => (
          <G key={i}>
            <Circle cx={xScale(d.date)} cy={yScale(d.value)} r={4} fill="#4F46E5" />
            <SvgText
              x={xScale(d.date)}
              y={yScale(d.value) - 10}
              fontSize="12"
              fill="#4F46E5"
              textAnchor="middle"
            >
              {d.value}
            </SvgText>
            <SvgText
              x={xScale(d.date)}
              y={graphs.height - graphs.margin.bottom + 15}
              fontSize="10"
              fill="#6B7280"
              textAnchor="middle"
            >
              {weekFormat(d.date)}
            </SvgText>
          </G>
        ))}
      </Svg>
    </View>
  );
};

export default DashboardLineChart;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
    borderRadius: 12,
  },
});
