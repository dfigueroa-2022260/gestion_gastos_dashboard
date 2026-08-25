import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  actualizar,
  crear,
  eliminar,
  listar,
  resumen,
} from "./gasto.controller";
import { gastoSchema } from "./gasto.schema";

const router = Router();

router.use(authMiddleware);

router.get("/", listar);
router.get("/resumen", resumen);
router.post("/", validate(gastoSchema), crear);
router.put("/:id", validate(gastoSchema), actualizar);
router.delete("/:id", eliminar);

export default router;
