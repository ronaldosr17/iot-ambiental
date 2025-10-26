import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Grafico = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-5">
      <h4 className="text-center mb-3">📈 Gráfico en tiempo real (Firebase)</h4>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperatura_C"
            stroke="#ff7300"
            name="Temperatura (°C)"
          />
          <Line
            type="monotone"
            dataKey="humedad_%"
            stroke="#0088FE"
            name="Humedad (%)"
          />
          <Line
            type="monotone"
            dataKey="radiacion_Wm2"
            stroke="#00C49F"
            name="Radiación (W/m²)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Grafico;
