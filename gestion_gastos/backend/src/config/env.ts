import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL as string,
  jwtSecret: process.env.JWT_SECRET || "cambia-este-secreto",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

if (!env.databaseUrl) {
  throw new Error("Falta configurar DATABASE_URL en el archivo .env");
}
