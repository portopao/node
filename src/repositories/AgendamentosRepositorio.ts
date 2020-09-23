import Agendamento from '../models/Agendamento';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Agendamento)
class AgendamentosRepositorio extends Repository<Agendamento> {
  public async achePorData(data: Date): Promise<Agendamento | null> {
    const procurarAgendamentoNaMesmaData = await this.findOne({
      where: { data },
    });

    return procurarAgendamentoNaMesmaData || null;
  }
}

export default AgendamentosRepositorio;
