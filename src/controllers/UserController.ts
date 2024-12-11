import { PrismaClient } from "@prisma/client";
import { listen } from "bun";

const prisma = new PrismaClient();

export const UserController = {
  signIn: async ({
    body,
    jwt,
  }: {
    body: {
      username: string;
      password: string;
    };
    jwt: any;
  }) => {
    try {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          username: true,
          level: true,
        },
        where: {
          username: body.username,
          password: body.password,
          status: "active",
        },
      });

      if (!user) {
        return { message: "Invalid username or password" };
      }

      const token = await jwt.sign(user);

      return { user, token };
    } catch (error) {
      return error;
    }
  },
  update: async ({
    body,
    request,
    jwt,
  }: {
    body: {
      username: string;
      password: string;
    };
    request: any;
    jwt: any;
  }) => {
    try {
      const headers = request.headers.get("Authorization");
      const token = headers?.split(" ")[1];

      const payload = await jwt.verify(token);

      const id = payload.id;
      const oldUser = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!oldUser) {
        return { message: "User not found" };
      }
      const newData = {
        username: body.username,
        password: body.password == "" ? oldUser?.password : body.password,
      };
      if (body.password) {
        newData.password = body.password;
      }
      await prisma.user.update({
        where: {
          id,
        },
        data: newData,
      });
      return { message: "success" };
    } catch (error) {
      return error;
    }
  },
  list: async () => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          level: true,
        },
        where: {
          status: "active",
        },
        orderBy: {
          id: "desc",
        },
      });
      return users;
    } catch (error) {
      return error;
    }
  },
  create: async ({
    body,
  }: {
    body: {
      username: string;
      password: string;
      level: string;
    };
  }) => {
    try {
      await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          level: body.level,
        },
      });
      return { message: "success" };
    } catch (error) {
      return error;
    }
  },
  remove: async ({ params }: { params: { id: string } }) => {
    try {
      const id = parseInt(params.id);
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return { message: "User not found" };
      }
      await prisma.user.update({
        where: {
          id: parseInt(params.id),
        },
        data: {
          status: "inactive",
        },
      });
      return { message: "success" };
    } catch (error) {
      return error;
    }
  },
  updateUser: async ({
    body,
    params,
  }: {
    body: {
      username: string;
      password: string;
      level: string;
    };
    params: {
      id: string;
    };
  }) => {
    try {
      const id = parseInt(params.id);
      const oldUser = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!oldUser) {
        return { message: "User not found" };
      }
      const newData = {
        username: body.username,
        password: body.password == "" ? oldUser?.password : body.password,
        level: body.level,
      };

      await prisma.user.update({
        where: {
          id: parseInt(params.id),
        },
        data: newData,
      });
      return { message: "success" };
    } catch (error) {
      return error;
    }
  },
};
