import { Hono } from "hono";
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";

const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/product", productRouter);

app.get("/", (c) => {
  return c.text("Backend Working Fine");
});

export default app;
