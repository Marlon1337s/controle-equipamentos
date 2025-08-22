import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Equipment } from "./entities/Equipment";
import { EquipmentType } from "./entities/EquipmentType";
import { Employee } from "./entities/Employee";
import { Reservation } from "./entities/Reservation";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Equipment, EquipmentType, Employee, Reservation],
  synchronize: true,
  logging: false,
});
