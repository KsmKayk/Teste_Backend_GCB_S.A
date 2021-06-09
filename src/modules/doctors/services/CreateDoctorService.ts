import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import axios from 'axios';

import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

interface IRequest {
  name: string;
  crm: number;
  telephone: number;
  cellphone: number;
  cep: number;
  expertise: string;
}

@injectable()
class CreateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    name,
    telephone,
    expertise,
    crm,
    cellphone,
    cep,
  }: IRequest): Promise<Doctor> {
    let address = await axios.get(`http://cep.la/${cep}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    const doctor = await this.doctorsRepository.create({
      name,
      telephone,
      cellphone,
      crm,
      expertise,
      cep,
      city: address.data.cidade,
      district: address.data.bairro,
      street: address.data.logradouro,
      uf: address.data.uf,
    });
    return doctor;
  }
}

export default CreateDoctorService;
