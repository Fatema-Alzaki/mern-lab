// routes/api/hoots.js
import { Router } from "express";
import { index, create } from "../../controllers/api/hoots.js";
import ensureLoggedIn from "../../config/ensureLoggedIn.js";

const router = Router();
router.use(ensureLoggedIn);
router.get("/", index);
router.post("/", create);
export default router;
