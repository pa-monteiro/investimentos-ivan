import { CreateDailyPostingController } from '@modules/daily_posting/useCases/createDailyPosting/CreateDailyPostingController';
import { GetDailyPostingsMonthController } from '@modules/daily_posting/useCases/getDailyPostingsMonth/GetDailyPostingsMonthController';
import { GetIndicatorsReportController } from '@modules/daily_posting/useCases/getIndicatorsReport/GetIndicatorsReportController';
import { UpdateDailyPostingController } from '@modules/daily_posting/useCases/updateDailyPosting/UpdateDailyPostingController';
import { DashboardController } from '@modules/payments/useCases/dashboard/DashboardController';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const dailyPostingRouter = Router();

dailyPostingRouter.use(ensureAuthenticated)
dailyPostingRouter.get('/dashboard', new DashboardController().handle)
dailyPostingRouter.use(ensureAdmin)
dailyPostingRouter.post('/', new CreateDailyPostingController().handle)
dailyPostingRouter.put('/:id', new UpdateDailyPostingController().handle)
dailyPostingRouter.get('/', new GetDailyPostingsMonthController().handle)
dailyPostingRouter.get('/reports/indicators', new GetIndicatorsReportController().handle)

export {
    dailyPostingRouter
}