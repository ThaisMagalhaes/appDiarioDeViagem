import { useEffect, useState } from "react";
import { connection } from "../core/database";

export function useDatabaseInitialize() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!connection.isInitialized) {
        connection
        .initialize()
        .then(() => {
          console.log("Database connected!");
          setReady(true);
        })
        .catch((e) => {
          console.log("Erro on database initialize", e);
          setReady(false);
        });
    }

    return () => {
        connection.destroy();
        setReady(false);
    };
  }, []);

  return { ready };
}