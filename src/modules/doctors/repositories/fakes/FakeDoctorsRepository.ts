import { uuid } from 'uuidv4';

import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';
import IDeleteDoctorDTO from '@modules/doctors/dtos/IDeleteDoctorDTO';

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

  public async findAllDoctors(): Promise<Doctor[]> {
    return this.doctors;
  }

  public async softDeleteDoctor(doctorData: IDeleteDoctorDTO): Promise<string> {
    this.doctors.map((doctor, index) => {
      if (doctor.id === doctorData.id) {
        this.doctors.splice(index, 1);
      }
      return index;
    });

    return 'ok';
  }

  public async findById(id: string): Promise<Doctor | undefined> {
    const findDoctor = this.doctors.find(doctor => doctor.id === id);

    return findDoctor;
  }
}

export default FakeDoctorsRepository;
