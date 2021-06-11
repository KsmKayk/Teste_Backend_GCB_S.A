import Doctor from '../infra/typeorm/entities/Doctor';
import ICreateDoctorDTO from '../dtos/ICreateDoctorDTO';
import IDeleteDoctorDTO from '../dtos/IDeleteDoctorDTO';
import ISearchDoctorDTO from '../dtos/ISearchDoctorDTO';

export default interface IDoctorsRepository {
  create(data: ICreateDoctorDTO): Promise<Doctor>;
  save(doctor: Doctor): Promise<Doctor>;
  findAllDoctors(): Promise<Doctor[]>;
  softDeleteDoctor(data: IDeleteDoctorDTO): Promise<string>;
  findById(id: string): Promise<Doctor | undefined>;
  find(data: ISearchDoctorDTO): Promise<Doctor[] | Doctor | undefined>;
}
