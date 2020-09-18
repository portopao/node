import { isEqual } from 'date-fns';
import Agendamento from '../models/Agendamento';

// Manipulações dentro do agendamento (CRUD)
interface CriarAgendamentoDTO {
  empresa: string;

  data: Date;
}

class AgendamentosRepositorio {
  private agendamentos: Agendamento[];

  constructor() {
    this.agendamentos = [];
  }

  public all(): Agendamento[] {
    return this.agendamentos;
  }

  public achePorData(data: Date): Agendamento | null {
    const procurarAgendamentoNaMesmaData = this.agendamentos.find((agend) =>
      isEqual(data, agendamento.data)
    );

    return procurarAgendamentoNaMesmaData || null;
  }

  public create({ empresa, data }: CriarAgendamentoDTO): Agendamento {
    const agendamento = new Agendamento({ empresa, data });

    this.agendamentos.push(agendamento);

    return agendamento;
  }
}

export default AgendamentosRepositorio;
