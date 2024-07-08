import express from "express";
import { verifyJWT } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", verifyJWT, categoryRouter);
app.use("/api/v1/product", verifyJWT, productRouter);

export default app;
