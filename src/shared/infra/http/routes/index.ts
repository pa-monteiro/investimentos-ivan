import { Router } from 'express'
import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { productsRouter } from './products.routes'
import { dailyPostingRouter } from './daily_posting.routes';
import { paymentsRouter } from './payments.routes';
import { passwordRoutes } from './password.routes';

const router = Router();

router.use("/users", usersRoutes)
router.use("/sessions", authenticateRoutes)
router.use("/products", productsRouter)
router.use("/daily-posting", dailyPostingRouter)
router.use('/payments', paymentsRouter);
router.use('/password', passwordRoutes);

export {
    router
}