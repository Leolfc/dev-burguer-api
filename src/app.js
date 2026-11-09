import express from 'express';
import routes from './routes.js';
import fileRouteConfig from './config/fileRoutes.cjs';
import cors from 'cors';
import 'dotenv/config';
const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://dev-burguer-frontend.ochndi.easypanel.host'
  ]
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product-file', fileRouteConfig);
app.use('/category-file', fileRouteConfig);
app.use(routes);
export default app;
