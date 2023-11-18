import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ViagemModel } from './viagemModel';

@Entity('viagem_entradas')
export class ViagemEntradaModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  local: string;

  @Column({ length: Number.MAX_VALUE })
  descricao: string;

  @Column({ type: 'date' })
  data: Date;

  @ManyToOne(() => ViagemModel, (viagem) => viagem.entradas)
  @JoinColumn({ name: 'viagemId' })
  viagem: ViagemModel;
}
