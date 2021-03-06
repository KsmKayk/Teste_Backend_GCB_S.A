import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import axios from 'axios';

import * as yup from 'yup';
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

const RequestValidationWithoutExpertise = yup.object().shape({
  name: yup.string().required().max(120).min(3),
  crm: yup
    .number()
    .required()
    .test(
      'len',
      'Must be exactly 7 characters',
      val => val?.toString().length === 7,
    ),
  cellphone: yup
    .number()
    .required()
    .test(
      'len',
      'Must be exactly 11 characters',
      val => val?.toString().length === 11,
    ),
  telephone: yup
    .number()
    .required()
    .test(
      'len',
      'Must be exactly 10 characters',
      val => val?.toString().length === 10,
    ),
  cep: yup
    .number()
    .required()
    .test(
      'len',
      'Must be exactly 8 characters',
      val => val?.toString().length === 8,
    ),
  expertise: yup.string().required(),
});
const RequestValidationOnlyExpertise = yup.object().shape({
  expertise: yup.array().of(yup.string()).required().min(2),
});

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
    await RequestValidationWithoutExpertise.validate({
      name,
      crm,
      telephone,
      cellphone,
      cep,
      expertise,
    }).catch(function (err) {
      throw new AppError(err.errors[0]);
    });

    if (!expertise.includes(',')) {
      throw new AppError('Expertises must be separated by commas (,)!');
    }

    const expertiseSplit = expertise.split(',').map(function (item) {
      return item.trim();
    });

    await RequestValidationOnlyExpertise.validate({
      expertise: expertiseSplit,
    }).catch(function (err) {
      throw new AppError(err.errors[0]);
    });

    const indexedExpertises = [
      'Alergologia',
      'Angiologia',
      'Buco maxilo',
      'Cardiologia cl??nca',
      'Cardiologia infantil',
      'Cirurgia cabe??a e pesco??o',
      'Cirurgia card??aca',
      'Cirurgia de t??rax',
    ];

    expertiseSplit.map(item => {
      let equal = false;
      let i = 0;
      while (i < indexedExpertises.length) {
        if (item.toLowerCase() === indexedExpertises[i].toLowerCase()) {
          equal = true;
          break;
        } else {
          i += 1;
        }
      }

      if (i === indexedExpertises.length && equal === false) {
        throw new AppError(
          'The sended expertises are incompatible with indexed expertises',
        );
      } else {
        return item;
      }
    });

    const address = await axios.get(`http://cep.la/${cep}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (address.data.length === 0) {
      throw new AppError('This cep is invalid');
    }

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
