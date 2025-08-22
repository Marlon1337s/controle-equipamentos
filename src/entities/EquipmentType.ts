import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Equipment } from "./Equipment";

@Entity("tb_tipo_equipamento")
export class EquipmentType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  tipo_equipamento!: string;

  @Column({ default: true })
  status!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ nullable: true })
  created_by!: string;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ nullable: true })
  updated_by!: string;

  @OneToMany(() => Equipment, (e) => e.tipo)
  equipamentos!: Equipment[];
}
