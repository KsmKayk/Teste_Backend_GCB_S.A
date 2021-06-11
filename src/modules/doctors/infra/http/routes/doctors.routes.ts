import { Router } from 'express';

import DoctorsController from '../controllers/DoctorsController';

const doctorsRouter = Router();
const doctorsController = new DoctorsController();

doctorsRouter.post('/', doctorsController.create);
doctorsRouter.get('/', doctorsController.findAll);
doctorsRouter.delete('/:id', doctorsController.delete);
doctorsRouter.patch('/:id', doctorsController.update);
doctorsRouter.get('/:type/:value', doctorsController.find);

export default doctorsRouter;
