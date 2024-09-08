import { Hono } from "hono";
import { verify } from "hono/jwt";
import getPrismaInstance from "../utils/db";

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

router.get("/", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  try {
    const { categories, minPrice, maxPrice } = c.req.query();

    const filters: any = {};
    if (categories) {
      filters.category = {
        name: {
          in: categories.split(","),
        },
      };
    }
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.gte = parseInt(minPrice);
      if (maxPrice) filters.price.lte = parseInt(maxPrice);
    }

    const products = await prisma.product.findMany({
      where: filters,
      include: {
        category: true,
      },
    });
    return c.json(products, 200);
  } catch (e) {
    return c.json({ message: "Error fetching products" }, 500);
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

export default router;
