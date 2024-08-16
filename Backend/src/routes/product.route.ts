import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createproductSchema, updateproductSchema } from "codemart-common";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

router.use(async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  c.set("userId", payload.id as string);
  await next();
});

router.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const products = await prisma.product.findMany();
    return c.json(products);
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error",
      Error: e,
    });
  }
});

router.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = createproductSchema.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({
        message: "Invalid data",
      });
    }
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: parseInt(body.price),
        image: body.url,
      },
    });
    c.status(201);
    return c.json(product);
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error",
      Error: e,
    });
  }
});

router.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    return c.json(product);
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error",
    });
  }
});

router.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { success } = updateproductSchema.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({
        message: "Invalid data",
      });
    }
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        description: body.description,
        price: parseInt(body.price),
        image: body.image,
      },
    });
    console.log(body);
    return c.json(product);
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error",
    });
  }
});

router.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return c.json(product);
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error",
    });
  }
});

export default router;
