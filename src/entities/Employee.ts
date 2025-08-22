import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tb_funcionarios")
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  nome!: string;

  @Column({ length: 100 })
  departamento!: string;

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
