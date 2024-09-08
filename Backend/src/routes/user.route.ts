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
    const { success, data } = signupSchema.safeParse(body);
    if (!success) {
      return c.json({ message: "Invalid data" }, 400);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return c.json({ message: "User with this email already exists" }, 409);
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
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
    return c.json({ user, token }, 201);
  } catch (e) {
    return c.json({ message: "Error" }, 500);
  }
});

router.post("/login", async (c) => {
  const prisma = getPrismaInstance(c.env.DATABASE_URL);
  try {
    const body = await c.req.json();
    const { success, data } = loginSchema.safeParse(body);
    if (!success) {
      return c.json({ message: "Invalid Email or Password" }, 400);
    }
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    const isPasswordSame = await verifyPassword(user.password, body.password);
    if (!isPasswordSame) {
      return c.json({ message: "Invalid Email or Password" }, 401);
    }
    const payload = {
      id: user.id,
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);
    return c.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
      200
    );
  } catch (e) {
    return c.json({ message: "Login Failed" }, 500);
  }
});

export default router;
