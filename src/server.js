import express from "express";
import dotenv from "dotenv";
import "./config/mongo.config.js";
import productRouter from "./routes/products.route.js";
import userRouter from "./routes/users.route.js";

dotenv.config();

const app = express();

// // Middlewares para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

const httpServer = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);

app.use('/products', productRouter);
app.use('/users', userRouter);

export default app;
