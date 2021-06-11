import { uuid } from 'uuidv4';

import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';
import IDeleteDoctorDTO from '@modules/doctors/dtos/IDeleteDoctorDTO';

import ISearchDoctorDTO from '@modules/doctors/dtos/ISearchDoctorDTO';
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

  public async find({
    type,
    value,
  }: ISearchDoctorDTO): Promise<Doctor | Doctor[] | undefined> {
    let findDoctor: Doctor | undefined;
    if (type === 'id') {
      findDoctor = this.doctors.find(doctor => doctor.id === value);
    }
    if (type === 'name') {
      findDoctor = this.doctors.find(doctor => doctor.name === value);
    }
    if (type === 'crm') {
      findDoctor = this.doctors.find(doctor => doctor.crm === value);
    }
    if (type === 'cellphone') {
      findDoctor = this.doctors.find(doctor => doctor.cellphone === value);
    }
    if (type === 'telephone') {
      findDoctor = this.doctors.find(doctor => doctor.telephone === value);
    }
    if (type === 'cep') {
      findDoctor = this.doctors.find(doctor => doctor.cep === value);
    }
    if (type === 'street') {
      findDoctor = this.doctors.find(doctor => doctor.street === value);
    }
    if (type === 'city') {
      findDoctor = this.doctors.find(doctor => doctor.city === value);
    }
    if (type === 'uf') {
      findDoctor = this.doctors.find(doctor => doctor.uf === value);
    }
    if (type === 'expertise') {
      findDoctor = this.doctors.find(doctor => doctor.expertise === value);
    }
    if (type === 'district') {
      findDoctor = this.doctors.find(doctor => doctor.district === value);
    }

    return findDoctor;
  }
}

export default FakeDoctorsRepository;
