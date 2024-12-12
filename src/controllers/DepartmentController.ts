// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// export const DepartmentController = {
//   list: async () => {
//     try {
//       const departments = await prisma.department.findMany({
//         where: {
//           status: "active",
//         },
//         orderBy: {
//           name: "asc",
//         },
//       });
//     } catch (error) {
//       return error;
//     }
//   },
// };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const DepartmentController = {
  list: async () => {
    try {
      const departments = await prisma.department.findMany({
        where: {
          status: "active",
        },
        orderBy: {
          name: "asc",
        },
      });
      return departments; // ต้อง return ค่าออกไปเพื่อให้ Elysia สามารถส่งค่าออกไปได้
    } catch (error) {
      return error;
    }
  },
};
