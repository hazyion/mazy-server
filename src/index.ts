import express from 'express';
import router from './router';

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api', router)

app.listen(port, () => {
  console.log('bkend is running, port ' + port);
});

