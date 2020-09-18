import { uuid } from 'uuidv4';

class Agendamento {
  id: string;

  empresa: string;

  data: Date;

  constructor(empresa: string, data: Date) {
    this.id = uuid();
    this.empresa = empresa;
    this.data = data;
  }
}

export default Agendamento;
