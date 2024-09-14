import { Hono } from "hono";
import { cors } from "hono/cors";
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";
import adminRouter from "./routes/admin.route";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Add CORS middleware
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/api/v1/user", userRouter);
app.route("/api/v1/products", productRouter);
app.route("/api/v1/category", categoryRouter);
app.route("/api/v1/admin", adminRouter);

export default app;
