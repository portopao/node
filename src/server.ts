import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'Porto pao server!' });
});

app.listen(3333, () => {
  console.log('Servidor Porto Pao ON 3333!');
});
