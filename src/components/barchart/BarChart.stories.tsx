import BarChart from "./BarChart";

export default {
  title: "BarChart",
  component: BarChart,
};

const sampleData = [
  { label: "A", value: 30 },
  { label: "B", value: 80 },
  { label: "C", value: 45 },
  { label: "D", value: 60 },
  { label: "E", value: 20 },
];

export const Default = () => <BarChart data={sampleData} />;