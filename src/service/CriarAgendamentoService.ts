import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Agendamento from '../models/Agendamento';
import AgendamentosRepositorio from '../repositories/AgendamentosRepositorio';

interface RequestDTO {
  empresa: string;

  data: Date;
}

// dependecy inversion(SOLID)

class CriarAgendamentoService {
  public async execute({ data, empresa }: RequestDTO): Promise<Agendamento> {
    const agendamentosRepositorio = getCustomRepository(
      AgendamentosRepositorio
    );

    const horaAgendamento = startOfHour(data);

    const procurarAgendamentoNaMesmaData = await agendamentosRepositorio.achePorData(
      horaAgendamento
    );

    if (procurarAgendamentoNaMesmaData) {
      throw Error(
        'Este horário de agendamento está ocupado. Por favor, selecione outro'
      );
    }

    const agendamento = agendamentosRepositorio.create({
      empresa,
      data: horaAgendamento,
    });

    await agendamentosRepositorio.save(agendamento);

    return agendamento;
  }
}

export default CriarAgendamentoService;
