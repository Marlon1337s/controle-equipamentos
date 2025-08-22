import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { EquipmentType } from "./EquipmentType";

export type EquipmentStatus = "disponivel" | "manutencao" | "emprestado";

@Entity("tb_equipamentos")
export class Equipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "id_tipo_equipamento" })
  @Column({ length: 150 })
  nome_equipamento!: string;

  @ManyToOne(() => EquipmentType, (t) => t.equipamentos, { eager: true })
  @JoinColumn({ name: "id_tipo_equipamento" })
  tipo!: EquipmentType;

  @Column({ type: "varchar", length: 20, default: "disponivel" })
  status!: EquipmentStatus;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ nullable: true })
  created_by!: string;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ nullable: true })
  updated_by!: string;
}
