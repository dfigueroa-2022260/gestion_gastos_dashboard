import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/password.util";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@cashtrack.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const passwordHash = await hashPassword(password);

  const admin = await prisma.usuario.upsert({
    where: { email },
    update: { rol: "ADMIN" },
    create: {
      nombre: "Administrador",
      email,
      password: passwordHash,
      rol: "ADMIN",
    },
  });

  console.log(`Usuario admin listo: ${admin.email} (rol: ${admin.rol})`);
  if (!process.env.ADMIN_PASSWORD) {
    console.log(`Password por defecto: ${password} (cambiala luego de iniciar sesion)`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
