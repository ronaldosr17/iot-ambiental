import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { jsPDF } from "jspdf";

import Grafico from "./components/Grafico";
import PanelResumen from "./components/PanelResumen";
import GraficoPromedioHora from "./components/GraficoPromedioHora"; // ✅ Nuevo componente
import useFirebaseData from "./hooks/useFirebaseData";

function App() {
  const { datos, loading } = useFirebaseData();
  const [darkMode, setDarkMode] = useState(false);
  const [filtrarOutliers, setFiltrarOutliers] = useState(false);

  // 🔹 Modo oscuro
  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
  }, [darkMode]);

  // 🔹 Filtrar valores atípicos
  const datosFiltrados = filtrarOutliers
    ? datos.filter(
        (d) =>
          d.temperatura_C > -10 &&
          d.temperatura_C < 60 &&
          d["humedad_%"] >= 0 &&
          d["humedad_%"] <= 100 &&
          d.radiacion_Wm2 >= 0 &&
          d.radiacion_Wm2 < 1500
      )
    : datos;

  // 🔹 Exportar CSV
  const exportarCSV = () => {
    if (datosFiltrados.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }
    const encabezado = "fecha,hora,temperatura_C,humedad_%,radiacion_Wm2";
    const filas = datosFiltrados.map(
      (d) => `${d.fecha},${d.hora},${d.temperatura_C},${d["humedad_%"]},${d.radiacion_Wm2}`
    );
    const csv = [encabezado, ...filas].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte_firebase.csv";
    a.click();
  };

  // 🔹 Exportar PDF
  const exportarPDF = () => {
    if (datosFiltrados.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte Ambiental (Firebase)", 14, 20);

    doc.setFontSize(12);
    datosFiltrados.slice(0, 30).forEach((fila, i) => {
      const y = 40 + i * 8;
      doc.text(
        `${fila.fecha || "—"} ${fila.hora || "—"}  |  Temp: ${
          fila.temperatura_C
        }°C  |  Hum: ${fila["humedad_%"]}%  |  Rad: ${
          fila.radiacion_Wm2
        } W/m²`,
        14,
        y
      );
    });

    doc.save("reporte_firebase.pdf");
  };

  return (
    <div
      className={`container mt-4 ${darkMode ? "bg-dark text-light" : "text-dark"}`}
      style={{ minHeight: "100vh" }}
    >
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>🌤️ Dashboard Ambiental</h1>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label className="form-check-label">Modo oscuro</label>
        </div>
      </div>

      {/* Filtros y botones */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          🔄 {loading ? "Cargando..." : "Recargar datos"}
        </button>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="outlierSwitch"
            checked={filtrarOutliers}
            onChange={(e) => setFiltrarOutliers(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="outlierSwitch">
            Filtrar valores atípicos
          </label>
        </div>
      </div>

      {/* Tabla */}
      {loading ? (
        <p className="text-center">Cargando datos desde Firebase...</p>
      ) : datosFiltrados.length === 0 ? (
        <p className="text-center text-muted">
          No hay registros en Firebase.
        </p>
      ) : (
        <>
          <table
            className={`table table-bordered ${
              darkMode ? "table-dark" : "table-striped"
            }`}
          >
            <thead className={darkMode ? "table-light" : "table-dark"}>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Temperatura (°C)</th>
                <th>Humedad (%)</th>
                <th>Radiación (W/m²)</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.slice(0, 30).map((fila) => (
                <tr key={fila.id}>
                  <td>{fila.fecha}</td>
                  <td>{fila.hora}</td>
                  <td>{fila.temperatura_C}</td>
                  <td>{fila["humedad_%"]}</td>
                  <td>{fila.radiacion_Wm2}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botones de exportación */}
          <div className="d-flex justify-content-end gap-2 mb-4">
            <button className="btn btn-outline-success" onClick={exportarCSV}>
              📁 Exportar CSV
            </button>
            <button className="btn btn-outline-danger" onClick={exportarPDF}>
              📄 Exportar PDF
            </button>
          </div>

          {/* Gráfico y resumen */}
          <Grafico data={datosFiltrados} />
          <PanelResumen datos={datosFiltrados} />
          <GraficoPromedioHora /> {/* ✅ Aquí se muestra la interfaz de consultas avanzadas */}
        </>
      )}
    </div>
  );
}

export default App;

