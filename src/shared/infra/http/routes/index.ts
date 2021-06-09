import { Router } from 'express';

import doctorsRouter from '@modules/doctors/infra/http/routes/doctors.routes';

const routes = Router();

routes.use('/doctors', doctorsRouter);

export default routes;
