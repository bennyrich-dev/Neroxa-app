import { Router } from "express";
import contentRouter from "./content";

const router = Router();

router.get("/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

router.use(contentRouter);

export default router;
