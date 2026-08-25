import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { listar, perfil } from "./usuario.controller";

const router = Router();

router.get("/me", authMiddleware, perfil);

// Solo administradores pueden ver el listado completo de usuarios.
router.get("/", authMiddleware, requireRole("ADMIN"), listar);

export default router;
