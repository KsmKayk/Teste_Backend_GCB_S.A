import { getRepository, Repository, Like } from 'typeorm';

import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';
import IDeleteDoctorDTO from '@modules/doctors/dtos/IDeleteDoctorDTO';

import ISearchDoctorDTO from '@modules/doctors/dtos/ISearchDoctorDTO';
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

  public async find({
    type,
    value,
  }: ISearchDoctorDTO): Promise<Doctor[] | Doctor | undefined> {
    let findDoctor: Doctor[] | Doctor | undefined;
    if (type === 'id') {
      findDoctor = await this.ormRepository.find({
        where: { id: Like(`%${value}%`) },
      });
    }
    if (type === 'name') {
      findDoctor = await this.ormRepository.find({
        where: { name: Like(`%${value}%`) },
      });
    }
    if (type === 'crm') {
      findDoctor = await this.ormRepository.find({
        where: { crm: Like(`%${value}%`) },
      });
    }
    if (type === 'cellphone') {
      findDoctor = await this.ormRepository.find({
        where: { cellphone: Like(`%${value}%`) },
      });
    }
    if (type === 'telephone') {
      findDoctor = await this.ormRepository.find({
        where: { telephone: Like(`%${value}%`) },
      });
    }
    if (type === 'cep') {
      findDoctor = await this.ormRepository.find({
        where: { cep: Like(`%${value}%`) },
      });
    }
    if (type === 'street') {
      findDoctor = await this.ormRepository.find({
        where: { street: Like(`%${value}%`) },
      });
    }
    if (type === 'city') {
      findDoctor = await this.ormRepository.find({
        where: { city: Like(`%${value}%`) },
      });
    }
    if (type === 'uf') {
      findDoctor = await this.ormRepository.find({
        where: { uf: Like(`%${value}%`) },
      });
    }
    if (type === 'expertise') {
      findDoctor = await this.ormRepository.find({
        where: { expertise: Like(`%${value}%`) },
      });
    }
    if (type === 'district') {
      findDoctor = await this.ormRepository.find({
        where: { district: Like(`%${value}%`) },
      });
    }

    return findDoctor;
  }
}

export default DoctorsRepository;
