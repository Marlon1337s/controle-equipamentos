import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("[DB] Conectado ao PostgreSQL");
    app.listen(PORT, () => {
      console.log(`[HTTP] Servidor ouvindo em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("[DB] Erro ao conectar", err);
    process.exit(1);
  });
