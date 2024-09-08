import { Hono } from "hono";
import { verify } from "hono/jwt";
import getPrismaInstance from "../utils/db";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware to check authentication for all routes
// router.use(async (c, next) => {
//   const authHeader = c.req.header("Authorization");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return c.json({ error: "Unauthorized" }, 401);
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const payload = await verify(token, c.env.JWT_SECRET);
//     c.set("userId", payload.id as string);
//   } catch (error) {
//     return c.json({ error: "Invalid token" }, 401);
//   }

//   await next();
// });

// Get all categories
router.get("/", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return c.json(categories, 200);
  } catch (e) {
    return c.json({ message: "Error fetching categories" }, 500);
  }
});

export default router;
