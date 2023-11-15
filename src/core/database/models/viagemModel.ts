import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('viagens')
export class ViagemModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  local: string;

  @Column({ type: 'date' })
  data: Date;
}
