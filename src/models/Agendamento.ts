import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agendamentos')
class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  empresa: string;

  @Column('timestamp with time zone')
  data: Date;
}

export default Agendamento;
