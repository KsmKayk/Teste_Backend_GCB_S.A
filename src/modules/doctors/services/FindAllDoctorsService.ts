import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

@injectable()
class FindDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(): Promise<Doctor[]> {
    const doctors = await this.doctorsRepository.findAllDoctors();
    return doctors;
  }
}
export default FindDoctorService;
