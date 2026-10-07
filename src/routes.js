import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
const routes = new Router();
import multerConfig from './config/multer.cjs';
import authMiddleware from './app/middlewares/auth.js';
import CategoryController from './app/controllers/CategoryController.js';
import adminMiddleware from './app/middlewares/admin.js';
import OrderController from './app/controllers/OrderController.js';
import CreatePaymentIntent from "../src/app/controllers/Stripe/CreatePaymentIntent.js"
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.use(authMiddleware);

routes.post(
  '/products',
  adminMiddleware,
  upload.single('file'),
  ProductController.store,
);

routes.put(
  '/products/:id',
  adminMiddleware,
  upload.single('file'),
  ProductController.update,
);

routes.get('/products', ProductController.index);

routes.post(
  '/categories',
  adminMiddleware,
  upload.single('file'),
  CategoryController.store,
);

routes.put(
  '/categories/:id',
  adminMiddleware,
  upload.single('file'),
  CategoryController.update,
);
routes.get('/categories', CategoryController.index);
export default routes;

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', adminMiddleware, OrderController.update);
routes.post("/create-payment-intent", CreatePaymentIntent.store)

/*Metodos HTTP
POST -> CRIAR
GET -> LISTAR
PUT/PATCH -> ATUALIZAR
DELETE -> DELETAR
*/
