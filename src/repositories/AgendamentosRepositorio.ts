import Agendamento from '../models/Agendamento';
import { isEqual } from 'date-fns';
// Manipulações dentro do agendamento (CRUD)

class AgendamentosRepositorio {
  private agendamentos: Agendamento[];

  constructor() {
    this.agendamentos = [];
  }

  public achePorData(data: Date): Agendamento | null {
    const procurarAgendamentoNaMesmaData = this.agendamentos.find((agend) =>
      isEqual(data, agendamento.data)
    );

    return procurarAgendamentoNaMesmaData || null;
  }

  public create(empresa: string, data: Date): Agendamento {
    const NovoAgendamento = new Agendamento(empresa, data);

    this.agendamentos.push(NovoAgendamento);

    return NovoAgendamento;
  }
}

export default AgendamentosRepositorio;
