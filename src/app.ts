import express from "express";
import morgan from "morgan";
import cors from "cors";
import categoriesRoutes from "./routes/categories.routes";
import usersRoutes from "./routes/users.routes";
import storesRoutes from "./routes/stores.routes";
import productsRoutes from "./routes/products.routes";
import imagesRoutes from "./routes/images.routes";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use(categoriesRoutes);
app.use(usersRoutes);
app.use(storesRoutes);
app.use(productsRoutes);
app.use(imagesRoutes);

export default app;
