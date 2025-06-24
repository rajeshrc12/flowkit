import { prisma } from "@/lib/prisma";

export async function findOrCreateUser(email: string, name: string) {
  if (!email || !name) return null;

  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }

    return user;
  } catch (error) {
    console.error("Error in findOrCreateUser:", error);
    throw new Error("Database operation failed");
  }
}
