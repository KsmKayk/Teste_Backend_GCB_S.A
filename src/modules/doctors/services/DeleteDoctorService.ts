import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import axios from 'axios';

import * as yup from 'yup';
import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const doctors = await this.doctorsRepository.findAllDoctors();
    let idExists = false;
    let index = 0;
    while (index < doctors.length) {
      if (doctors[index].id === id) {
        idExists = true;
      }
      index += 1;
    }

    if (idExists === true) {
      await this.doctorsRepository.softDeleteDoctor({ id });
    } else {
      throw new AppError("This doctor id doesn't exists on database");
    }
  }
}

export default DeleteDoctorService;
