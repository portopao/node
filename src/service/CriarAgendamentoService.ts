import Agendamento from '../models/Agendamento';
import { startOfHour } from 'date-fns';

import AgendamentosRepositorio from '../repositories/AgendamentosRepositorio';

interface RequestDTO {
  empresa: string;

  data: Date;
}

// dependecy inversion(SOLID)

class CriarAgendamentoService {
  private agendamentosRepositorio: AgendamentosRepositorio;

  constructor(agendamentosRepositorio: AgendamentosRepositorio) {
    this.agendamentosRepositorio = agendamentosRepositorio;
  }

  public execute({ data, empresa }: RequestDTO): Agendamento {
    const horaAgendamento = startOfHour(data);

    const procurarAgendamentoNaMesmaData = this.agendamentosRepositorio.achePorData(
      horaAgendamento
    );

    if (procurarAgendamentoNaMesmaData) {
      throw Error(
        'Este horário de agendamento está ocupado. Por favor, selecione outro'
      );
    }

    const agendamento = this.agendamentosRepositorio.create({
      empresa,
      data: horaAgendamento,
    });

    return agendamento;
  }
}

export default CriarAgendamentoService;
