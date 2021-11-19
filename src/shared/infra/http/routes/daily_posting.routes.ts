import { CreateDailyPostingController } from '@modules/daily_posting/useCases/createDailyPosting/CreateDailyPostingController';
import { GetIndicatorsReportController } from '@modules/daily_posting/useCases/getIndicatorsReport/GetIndicatorsReportController';
import { DashboardController } from '@modules/payments/useCases/dashboard/DashboardController';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const dailyPostingRouter = Router();

dailyPostingRouter.use(ensureAuthenticated)
dailyPostingRouter.use(ensureAdmin)
dailyPostingRouter.post('/', new CreateDailyPostingController().handle)
dailyPostingRouter.get('/dashboard', new DashboardController().handle)
dailyPostingRouter.get('/reports/indicators', new GetIndicatorsReportController().handle)

export {
    dailyPostingRouter
}