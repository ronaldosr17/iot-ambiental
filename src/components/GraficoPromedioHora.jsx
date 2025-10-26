import React, { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const GraficoPromedioHora = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [variable, setVariable] = useState("temperatura_C");
  const [tipoConsulta, setTipoConsulta] = useState("promedio");
  const [modoGrafico, setModoGrafico] = useState("linea");
  const [datos, setDatos] = useState([]);

  const consultar = async () => {
    if (!fechaInicio) return alert("Selecciona una fecha de inicio.");
    if (fechaFin && fechaFin < fechaInicio)
      return alert("La fecha final no puede ser anterior a la inicial.");

    try {
      const response = await axios.get("http://127.0.0.1:5000/promedio_hora", {
        params: { fechaInicio, fechaFin, variable, tipo: tipoConsulta },
      });
      setDatos(response.data);
    } catch (error) {
      console.error(error);
      alert("Error al obtener los datos del backend.");
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="text-center mb-4">🔎 Consultas avanzadas</h4>

      <div className="row g-2 mb-3">
        <div className="col-md-3">
          <label>Fecha inicio:</label>
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label>Fecha fin:</label>
          <input
            type="date"
            className="form-control"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label>Variable:</label>
          <select
            className="form-select"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
          >
            <option value="temperatura_C">Temperatura (°C)</option>
            <option value="humedad_%">Humedad (%)</option>
            <option value="radiacion_Wm2">Radiación (W/m²)</option>
          </select>
        </div>
        <div className="col-md-3">
          <label>Tipo de consulta:</label>
          <select
            className="form-select"
            value={tipoConsulta}
            onChange={(e) => setTipoConsulta(e.target.value)}
          >
            <option value="promedio">Promedio</option>
            <option value="maximo">Máximo</option>
            <option value="minimo">Mínimo</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <label className="me-2">Tipo de gráfico:</label>
          <select
            className="form-select d-inline w-auto"
            value={modoGrafico}
            onChange={(e) => setModoGrafico(e.target.value)}
          >
            <option value="linea">Línea</option>
            <option value="barras">Barras</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={consultar}>
          Consultar
        </button>
      </div>

      {datos.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          {modoGrafico === "linea" ? (
            <LineChart data={datos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={variable}
                stroke="#ff7300"
                name={variable}
              />
            </LineChart>
          ) : (
            <BarChart data={datos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={variable} fill="#82ca9d" name={variable} />
            </BarChart>
          )}
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-muted">
          Selecciona una fecha y variable para consultar.
        </p>
      )}
    </div>
  );
};

export default GraficoPromedioHora;
