import Doctor from '../infra/typeorm/entities/Doctor';
import ICreateDoctorDTO from '../dtos/ICreateDoctorDTO';
import IDeleteDoctorDTO from '../dtos/IDeleteDoctorDTO';

export default interface IDoctorsRepository {
  create(data: ICreateDoctorDTO): Promise<Doctor>;
  save(doctor: Doctor): Promise<Doctor>;
  findAllDoctors(): Promise<Doctor[]>;
  softDeleteDoctor(data: IDeleteDoctorDTO): Promise<string>;
  findById(id: string): Promise<Doctor | undefined>;
}
