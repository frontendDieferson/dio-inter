import 'express-async-errors';
import express from 'express';
import { createConnection } from 'typeorm';
import routes from './routes';
import { globalErrors } from './middlewares/globalErros';

import cors from "cors"
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
createConnection().then(connection => {
  const app = express();
  app.use(cors(corsOptions)) // Use this after the variable declaration
  const PORT = 3333;
  
  app.use(express.json())
  app.use(routes);
  app.use(globalErrors);
  
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.log("Unable to connect to the database", error);
});