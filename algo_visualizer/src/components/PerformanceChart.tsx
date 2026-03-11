import type { BenchmarkDataPoint } from "../algos/runner";
import type SortAlgorithm from "../algos/SortAlgorithm";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Tooltip
} from "recharts";

export type PerformanceChartProps = {
  data: BenchmarkDataPoint[];
  algos: SortAlgorithm[];
};

const PerformanceChart = ({ data, algos }: PerformanceChartProps) => {
  return (
    <div className="col-span-2 w-full h-full -mt-20">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <ComposedChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />
          <XAxis
            dataKey="n"
            type="number"
            domain={["dataMin", "dataMax"]}
          />
          <YAxis
            scale="auto"
            domain={[0, "auto"]}
            allowDataOverflow={true}
            tickFormatter={(value) => `${value}ms`}
          />
          <Legend
            verticalAlign="top"
            layout="vertical"
            iconType="circle"
            wrapperStyle={{
              position: "absolute",
              fontSize: "20px",
              left: "150px",
              top: "250px",
              zIndex: 5,
              borderRadius: "6px",
              padding: "5px 20px",
              backgroundColor: "#323232"
            }}
          />
          {algos.map((algo) => (
            <Line
              key={algo.name}
              type="monotone"
              dataKey={algo.name}
              stroke={algo.chartColor}
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
          ))}
          <Tooltip wrapperStyle={{ zIndex: 6 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
