import { useEffect, useState } from "react";
import { collectionGroup, getDocs } from "firebase/firestore";
import db from "../firebaseConfig";

const useFirebaseData = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("🚀 Iniciando conexión con Firestore...");
      try {
        const snapshot = await getDocs(collectionGroup(db, "mediciones"));
        console.log("📡 Resultado de la consulta:", snapshot.size);

        if (snapshot.empty) {
          console.warn("⚠️ No se encontraron documentos.");
        }

        const datosCargados = snapshot.docs.map((doc) => ({
          id: doc.id,
          path: doc.ref.path,
          ...doc.data(),
        }));

        console.log("🔥 Datos cargados:", datosCargados.slice(0, 3));
        setDatos(datosCargados);
      } catch (error) {
        console.error("❌ Error al obtener datos desde Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { datos, loading };
};

export default useFirebaseData;
