import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { hashPassword, verifyPassword } from "../utils/hashPassword";
import getPrismaInstance from "../utils/db";
import {
  createproductSchema,
  loginSchema,
  updateproductSchema,
} from "codemart-common";
import uploadImage from "../utils/imageUpload";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    UPLOAD_PRESET_NAME: string;
  };
  Variables: {
    admin: {
      id: string;
      role: string;
      email: string;
    };
  };
}>();

router.post("/login", async (c) => {
  try {
    const prisma = getPrismaInstance(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { success, data } = loginSchema.safeParse(body);
    if (!success) {
      return c.json({ message: "Invalid Email or Password" }, 400);
    }

    const admin = await prisma.admin.findUnique({
      where: { email: data.email },
    });
    if (!admin) {
      return c.json({ message: "Admin not found" }, 404);
    }
    const isPasswordSame = await verifyPassword(admin.password, body.password);
    if (!isPasswordSame) {
      return c.json({ message: "Invalid Email or Password" }, 401);
    }

    const payload = {
      id: admin.id,
      role: "admin",
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);

    return c.json({ token });
  } catch (error) {
    return c.json({ error: "Failed to login" }, 500);
  }
});

router.use(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (payload.role !== "admin") {
      return c.json({ error: "Forbidden" }, 403);
    }
    const prisma = getPrismaInstance(c.env.DATABASE_URL);
    const admin = await prisma.admin.findUnique({
      where: { id: payload.id as string },
      select: {
        id: true,
        email: true,
      },
    });
    if (!admin) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    c.set("admin", {
      id: admin.id,
      email: admin.email,
      role: "admin",
    });
    await next();
  } catch (error) {
    return c.json({ error: "Unauthorized" }, 401);
  }
});

router.post("/product", async (c) => {
  try {
    const prisma = getPrismaInstance(c.env.DATABASE_URL);
    const body = await c.req.parseBody();
    const uploadedImage = await uploadImage(
      c.env.CLOUDINARY_CLOUD_NAME,
      c.env.UPLOAD_PRESET_NAME,
      body.image
    );
    if (!uploadedImage) {
      return c.json({ message: "Failed to upload image" }, 500);
    }
    const { success, data } = createproductSchema.safeParse({
      ...body,
      stock: parseInt(body.stock as string),
      image: uploadedImage,
    });
    if (!success) {
      return c.json({ message: "Invalid data provided" }, 400);
    }
    const { name, description, price, categoryId, stock, image } = data;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        stock,
        image,
        category: {
          connect: { id: categoryId },
        },
      },
    });
    return c.json(product, 201);
  } catch (error) {
    return c.json({ error: "Failed to create product" }, 500);
  }
});

router.put("/product/:id", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  const id = c.req.param("id");
  const body = await c.req.parseBody();
  console.log(body);
  if (body.image && typeof body.image !== "string") {
    const uploadedImage = await uploadImage(
      c.env.CLOUDINARY_CLOUD_NAME,
      c.env.UPLOAD_PRESET_NAME,
      body.image
    );
    if (!uploadedImage) {
      return c.json({ message: "Failed to upload image" }, 500);
    }
    body.image = uploadedImage;
  }
  const { success, data, error } = updateproductSchema.safeParse({
    ...body,
    stock: parseInt(body.stock as string),
  });
  if (!success) {
    return c.json({ message: "Invalid data provided", error }, 400);
  }
  const { name, description, price, categoryId, stock, image } = data;

  const updateData: any = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (price !== undefined) updateData.price = parseInt(price);
  if (stock !== undefined) updateData.stock = stock;
  if (image !== undefined) updateData.image = image;
  if (categoryId !== undefined) {
    updateData.category = { connect: { id: categoryId } };
  }
  try {
    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });
    return c.json(product);
  } catch (error) {
    return c.json({ error: "Failed to update product" }, 500);
  }
});

router.delete("/product/:id", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  const id = c.req.param("id");

  try {
    await prisma.product.delete({
      where: { id },
    });
    return c.json({ message: "Product deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete product" }, 500);
  }
});

router.post("/category", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  const { name } = await c.req.json();

  try {
    const category = await prisma.category.create({
      data: { name },
    });
    return c.json(category, 201);
  } catch (error) {
    return c.json({ error: "Failed to create category" }, 500);
  }
});

router.put("/category/:id", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  const id = c.req.param("id");
  const { name } = await c.req.json();

  try {
    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });
    return c.json(category);
  } catch (error) {
    return c.json({ error: "Failed to update category" }, 500);
  }
});

router.delete("/category/:id", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  const id = c.req.param("id");

  try {
    await prisma.category.delete({
      where: { id },
    });
    return c.json({ message: "Category deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete category" }, 500);
  }
});

export default router;
