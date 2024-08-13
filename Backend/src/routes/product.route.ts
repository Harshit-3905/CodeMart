import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createproductSchema, updateproductSchema } from "codemart-common";
import getPrismaInstance from "../utils/db";
import uploadImage from "../utils/imageUpload";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    UPLOAD_PRESET_NAME: string;
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
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
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
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  try {
    const body = await c.req.parseBody();
    const { success, data, error } = createproductSchema.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({
        message: "Invalid data",
        error,
      });
    }
    const { name, description, price, categoryId } = data;
    let url = "";
    if (body.image) {
      url = await uploadImage(
        c.env.CLOUDINARY_CLOUD_NAME,
        c.env.UPLOAD_PRESET_NAME,
        body.image
      );
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        image: url,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    c.status(201);
    return c.json({ message: "Product created", product });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error",
      Error: e,
    });
  }
});

router.get("/:id", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
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
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { success, error } = updateproductSchema.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({
        message: "Invalid data",
        Error: error,
      });
    }
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...body,
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
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
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
