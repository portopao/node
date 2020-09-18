import { Router, response } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AgendamentosRepositorio from '../repositories/AgendamentosRepositorio';

const agendamentosRouter = Router();
const agendamentosRepositorio = new AgendamentosRepositorio();

agendamentosRouter.post('/', (request, response) => {
  //dados para criar agendamento
  const { empresa, data } = request.body;

  const horaConvertida = startOfHour(parseISO(data));
  const procurarAgendamentoNaMesmaData = agendamentosRepositorio.achePorData(
    horaConvertida
  );

  if (procurarAgendamentoNaMesmaData) {
    return response.status(400).json({
      message:
        'Este horário de agendamento está ocupado. Por favor, selecione outro',
    });
  }

  const agendamento = agendamentosRepositorio.create(empresa, horaConvertida);

  return response.json(agendamento);
});

export default agendamentosRouter;
