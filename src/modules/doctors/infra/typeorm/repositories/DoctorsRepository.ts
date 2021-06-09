import { getRepository, Repository } from 'typeorm';

import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';

import Doctor from '../entities/Doctor';

class DoctorsRepository implements IDoctorsRepository {
  private ormRepository: Repository<Doctor>;

  constructor() {
    this.ormRepository = getRepository(Doctor);
  }

  public async create(doctorData: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = this.ormRepository.create(doctorData);

    await this.ormRepository.save(doctor);

    return doctor;
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    return this.ormRepository.save(doctor);
  }
}

export default DoctorsRepository;
