import { Hono } from "hono";
import getPrismaInstance from "../utils/db";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {};
}>();

router.get("/", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return c.json(categories);
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error",
      Error: e,
    });
  }
});

router.post("/", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  try {
    const body = await c.req.json();
    const { name } = body;
    if (!name) {
      c.status(400);
      return c.json({
        message: "Invalid data",
      });
    }
    const category = await prisma.category.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return c.json(category);
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error",
      Error: e,
    });
  }
});

router.put("/:id", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  try {
    const body = await c.req.json();
    const { name } = body;
    if (!name) {
      c.status(400);
      return c.json({
        message: "Invalid data",
      });
    }
    const category = await prisma.category.update({
      where: {
        id: c.req.param("id"),
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return c.json(category);
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error",
      Error: e,
    });
  }
});

export default router;
