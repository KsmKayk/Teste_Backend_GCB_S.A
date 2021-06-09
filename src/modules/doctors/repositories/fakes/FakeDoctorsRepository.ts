import { uuid } from 'uuidv4';

import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';

import Doctor from '../../infra/typeorm/entities/Doctor';

class FakeDoctorsRepository implements IDoctorsRepository {
  private doctors: Doctor[] = [];

  public async create(doctorData: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();

    Object.assign(doctor, { id: uuid() }, doctorData);

    this.doctors.push(doctor);

    return doctor;
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    const findIndex = this.doctors.findIndex(
      findDoctor => findDoctor.id === doctor.id,
    );

    this.doctors[findIndex] = doctor;

    return doctor;
  }
}

export default FakeDoctorsRepository;
