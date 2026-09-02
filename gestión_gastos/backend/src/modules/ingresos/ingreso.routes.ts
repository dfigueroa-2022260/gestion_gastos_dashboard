import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  actualizar,
  crear,
  eliminar,
  listar,
  resumen,
} from "./ingreso.controller";
import { ingresoSchema } from "./ingreso.schema";

const router = Router();

router.use(authMiddleware);

router.get("/", listar);
router.get("/resumen", resumen);
router.post("/", validate(ingresoSchema), crear);
router.put("/:id", validate(ingresoSchema), actualizar);
router.delete("/:id", eliminar);

export default router;
