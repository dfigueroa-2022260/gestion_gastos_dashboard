import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { actualizar, crear, eliminar, listar } from "./categoria.controller";
import { categoriaSchema } from "./categoria.schema";

const router = Router();

router.use(authMiddleware);

router.get("/", listar);
router.post("/", validate(categoriaSchema), crear);
router.put("/:id", validate(categoriaSchema), actualizar);
router.delete("/:id", eliminar);

export default router;
