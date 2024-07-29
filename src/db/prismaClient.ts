// import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient().$extends({
        result: {
          user: {
            fullName: {
              needs: { email: true, name: true },
              compute(user) {
                return `${user.name} ${user.email}`
              },
            },
          },
        },
      })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export {prisma}

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma