import { getRepository, Repository } from 'typeorm';

import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';
import IDeleteDoctorDTO from '@modules/doctors/dtos/IDeleteDoctorDTO';

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

  public async findAllDoctors(): Promise<Doctor[]> {
    const doctors = await this.ormRepository.find();
    return doctors;
  }

  public async softDeleteDoctor(doctorData: IDeleteDoctorDTO): Promise<string> {
    await this.ormRepository.softDelete(doctorData.id);
    return 'ok';
  }

  public async findById(id: string): Promise<Doctor | undefined> {
    const doctor = await this.ormRepository.findOne({ id });
    return doctor;
  }
}

export default DoctorsRepository;
