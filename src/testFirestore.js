import { collectionGroup, getDocs } from "firebase/firestore";
import db from "./firebaseConfig";

export const testFirestore = async () => {
  console.log("🚀 Probando conexión con Firestore...");

  try {
    const snapshot = await getDocs(collectionGroup(db, "mediciones"));
    console.log("📡 Total de documentos encontrados:", snapshot.size);

    snapshot.docs.slice(0, 5).forEach((doc) => {
      console.log("🧾 Documento:", doc.id, doc.ref.path, doc.data());
    });
  } catch (error) {
    console.error("❌ Error al consultar Firestore:", error);
  }
};