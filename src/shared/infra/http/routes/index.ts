import { Router } from 'express'
import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { productsRouter } from './products.routes'

const router = Router();

router.use("/users", usersRoutes)
router.use("/sessions", authenticateRoutes)

router.use("/products", productsRouter)

export {
    router
}