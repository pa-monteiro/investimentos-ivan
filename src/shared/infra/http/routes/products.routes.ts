import { CreateProductsController } from '@modules/products/useCases/createProducts/CreateProductsController';
import { FindProductByIdController } from '@modules/products/useCases/findProductById/FindProductByIdController';
import { GetProductsByUserController } from '@modules/products/useCases/getProductsByUser/GetProductsByUserController';
import { ListProductsController } from '@modules/products/useCases/listProducts/ListProductsController';
import { RemoveProductsController } from '@modules/products/useCases/removeProducts/RemoveProductsController';
import { UpdateProductsController } from '@modules/products/useCases/updateProducts/UpdateProductsController';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated)
productsRouter.get('/getProductsByUser', new GetProductsByUserController().handle)

productsRouter.use(ensureAdmin)
productsRouter.get('/', new ListProductsController().handle)
productsRouter.get('/:id', new FindProductByIdController().handle)
productsRouter.put('/:id', new UpdateProductsController().handle)
productsRouter.post('/', new CreateProductsController().handle)
productsRouter.post('/remove', new RemoveProductsController().handle)

export {
    productsRouter
}