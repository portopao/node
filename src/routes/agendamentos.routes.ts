import { Router } from 'express';
import { parseISO } from 'date-fns';

import AgendamentosRepositorio from '../repositories/AgendamentosRepositorio';
import CriarAgendamentoService from '../service/CriarAgendamentoService';

const agendamentosRouter = Router();
const agendamentosRepositorio = new AgendamentosRepositorio();

agendamentosRouter.get('/', (request, response) => {
  const agendamentos = agendamentosRepositorio.all();

  return response.json(agendamentos);
});

agendamentosRouter.post('/', (request, response) => {
  try {
    //dados para criar agendamento
    const { empresa, data } = request.body;

    const horaControlada = parseISO(data);

    const criarAgendamento = new CriarAgendamentoService(
      agendamentosRepositorio
    );

    const agendamento = criarAgendamento.execute({
      data: horaControlada,
      empresa,
    });

    return response.json(agendamento);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default agendamentosRouter;
