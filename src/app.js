import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);

export default app;
