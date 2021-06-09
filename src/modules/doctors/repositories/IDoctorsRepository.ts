import Doctor from '../infra/typeorm/entities/Doctor';
import ICreateDoctorDTO from '../dtos/ICreateDoctorDTO';

export default interface IDoctorsRepository {
  create(data: ICreateDoctorDTO): Promise<Doctor>;
  save(doctor: Doctor): Promise<Doctor>;
}
