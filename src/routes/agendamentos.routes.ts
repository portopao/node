import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AgendamentosRepositorio from '../repositories/AgendamentosRepositorio';
import CriarAgendamentoService from '../service/CriarAgendamentoService';

const agendamentosRouter = Router();

agendamentosRouter.get('/', async (request, response) => {
  const agendamentosRepositorio = getCustomRepository(AgendamentosRepositorio);
  const agendamentos = await agendamentosRepositorio.find();

  return response.json(agendamentos);
});

agendamentosRouter.post('/', async (request, response) => {
  try {
    //dados para criar agendamento
    const { empresa, data } = request.body;

    const horaControlada = parseISO(data);

    const criarAgendamento = new CriarAgendamentoService();

    const agendamento = await criarAgendamento.execute({
      data: horaControlada,
      empresa,
    });

    return response.json(agendamento);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default agendamentosRouter;
