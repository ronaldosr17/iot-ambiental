import React from "react";

const PanelResumen = ({ datos }) => {
  if (!datos || datos.length === 0) return null;

  const promedio = (campo) =>
    (
      datos.reduce((a, b) => a + (parseFloat(b[campo]) || 0), 0) / datos.length
    ).toFixed(2);

  const maximo = (campo) =>
    Math.max(...datos.map((d) => parseFloat(d[campo]) || 0)).toFixed(2);

  const minimo = (campo) =>
    Math.min(...datos.map((d) => parseFloat(d[campo]) || 0)).toFixed(2);

  return (
    <div className="card mt-4 p-4 shadow-sm">
      <h4 className="text-center mb-4">📋 Resumen de Firebase</h4>
      <div className="row text-center">
        <div className="col-md-4 mb-3">
          <h5>🌡️ Temperatura</h5>
          <p>
            <strong>Prom: {promedio("temperatura_C")}°C</strong>
            <br />
            Máx: {maximo("temperatura_C")}°C / Mín: {minimo("temperatura_C")}°C
          </p>
        </div>
        <div className="col-md-4 mb-3">
          <h5>💧 Humedad</h5>
          <p>
            <strong>Prom: {promedio("humedad_%")}%</strong>
            <br />
            Máx: {maximo("humedad_%")}% / Mín: {minimo("humedad_%")}%
          </p>
        </div>
        <div className="col-md-4 mb-3">
          <h5>☀️ Radiación</h5>
          <p>
            <strong>Prom: {promedio("radiacion_Wm2")} W/m²</strong>
            <br />
            Máx: {maximo("radiacion_Wm2")} / Mín: {minimo("radiacion_Wm2")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanelResumen;
