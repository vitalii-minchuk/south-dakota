import { Router } from "express";
import { mockProducts } from "../../mock-data";

const router = Router();

router.get("/api/products", (req, res) => {
  res.send(mockProducts);
});

export default router;
