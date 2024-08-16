import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

router.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const userExist = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (userExist) {
      return c.json({
        message: "User already exist",
      });
    }
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const payload = {
      id: user.id,
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);
    return c.json({
      user,
      token,
    });
  } catch (e) {
    return c.json({
      message: "Error",
    });
  }
});

router.post("/login", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return c.json({
        message: "User not found",
      });
    }
    if (user.password !== body.password) {
      return c.json({
        message: "Invalid password",
      });
    }
    const payload = {
      id: user.id,
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);
    return c.json({
      user,
      token,
    });
  } catch (e) {
    return c.json({
      message: "Login",
    });
  }
});

export default router;
