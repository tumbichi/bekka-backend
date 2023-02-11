import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import categoriesRoutes from './Routes/categories.routes';
import usersRoutes from './Routes/users.routes';
import storesRoutes from './Routes/stores.routes';
import productsRoutes from './Routes/products.routes';
import imagesRoutes from './Routes/images.routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/v1', categoriesRoutes);
app.use('/api/v1', usersRoutes);
app.use('/api/v1', storesRoutes);
app.use('/api/v1', productsRoutes);
app.use('/api/v1', imagesRoutes);

export default app;
