import { Router } from "express";
import { mockUsers } from "../../mock-data";

const router = Router();

router.get("/users", (req, res) => {
  res.send(mockUsers);
});

export default router;
