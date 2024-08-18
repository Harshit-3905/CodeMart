import { Hono } from "hono";
import { sign } from "hono/jwt";
import { loginSchema, signupSchema } from "codemart-common";
import getPrismaInstance from "../utils/db";
import { hashPassword, verifyPassword } from "../utils/hashPassword";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

router.post("/signup", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  try {
    const body = await c.req.json();
    const { success } = signupSchema.safeParse(body);
    if (!success) {
      return c.json({
        message: "Invalid data",
      });
    }
    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
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
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  try {
    const body = await c.req.json();
    const { success } = loginSchema.safeParse(body);
    if (!success) {
      return c.json({
        message: "Invalid data",
      });
    }
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
    const isPasswordSame = await verifyPassword(user.password, body.password);
    if (!isPasswordSame) {
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
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (e) {
    return c.json({
      message: "Login",
    });
  }
});

export default router;
