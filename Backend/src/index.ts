import { Hono } from "hono";
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/product", productRouter);
app.route("/api/v1/category", categoryRouter);

app.get("/", (c) => {
  return c.text("Backend Working Fine");
});

export default app;
