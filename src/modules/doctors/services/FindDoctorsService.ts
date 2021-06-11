import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

interface IRequestDTO {
  type: string;
  value: string | number;
}

@injectable()
class FindDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    type,
    value,
  }: IRequestDTO): Promise<Doctor[] | Doctor | undefined> {
    if (!type || !value) {
      throw new AppError('This research must have type and value');
    }

    const doctors = await this.doctorsRepository.find({ type, value });
    return doctors;
  }
}
export default FindDoctorService;
