import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { dailyPostingRouter } from "./daily_posting.routes";
import { passwordRoutes } from "./password.routes";
import { paymentsRouter } from "./payments.routes";
import { productsRouter } from "./products.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/sessions", authenticateRoutes);
router.use("/products", productsRouter);
router.use("/daily-posting", dailyPostingRouter);
router.use("/payments", paymentsRouter);
router.use("/password", passwordRoutes);

export { router };
