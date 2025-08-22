import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Column,
} from "typeorm";
import { Employee } from "./Employee";
import { Equipment } from "./Equipment";

@Entity("tb_reservas")
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee, { eager: true })
  @JoinColumn({ name: "funcionario_id" })
  funcionario!: Employee;

  @ManyToOne(() => Equipment, { eager: true })
  @JoinColumn({ name: "equipamento_id" })
  equipamento!: Equipment;

  @CreateDateColumn()
  data_inicio!: Date;

  @Column({ type: "timestamp", nullable: true })
  data_fim!: Date | null;
}
