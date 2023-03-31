/* eslint-disable no-console */
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const adminPassword = process.env.ADMIN_PASSWORD as string;

async function main() {
  const password = await bcrypt.hash(adminPassword, 13);
  const userData: Prisma.UserCreateInput[] = [
    {
      id: 'ca34c6a5-1f33-4ec3-a4cd-9b80593057fc',
      name: 'Administrator',
      password: password,
      email: 'admin@admin.com',
      role: {
        connectOrCreate: {
          where: {
            id: '7931683d-5ce6-4f15-8d9b-a6a0742cbc77',
          },
          create: {
            id: '7931683d-5ce6-4f15-8d9b-a6a0742cbc77',
            name: 'ADMIN',
          },
        },
      },
    },
  ];

  userData.forEach(async (user) => {
    await prisma.user.upsert({
      where: {
        id: user.id,
      },
      create: user,
      update: user,
    });
    console.log(`Seeding user ${user.name}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
