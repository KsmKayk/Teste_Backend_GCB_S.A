import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import axios from 'axios';

import * as yup from 'yup';
import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

interface IRequest {
  id: string;
  name?: string;
  crm?: number;
  telephone?: number;
  cellphone?: number;
  cep?: number;
  expertise?: string;
}
const nameValidation = yup
  .object()
  .shape({ name: yup.string().max(120).min(3) });
const crmValidation = yup.object().shape({
  crm: yup
    .number()
    .test(
      'len',
      'Must be exactly 7 characters',
      val => val?.toString().length === 7,
    ),
});
const cellphoneValidation = yup.object().shape({
  cellphone: yup
    .number()
    .test(
      'len',
      'Must be exactly 11 characters',
      val => val?.toString().length === 11,
    ),
});
const telephoneValidation = yup.object().shape({
  telephone: yup
    .number()
    .test(
      'len',
      'Must be exactly 10 characters',
      val => val?.toString().length === 10,
    ),
});
const cepValidation = yup.object().shape({
  cep: yup
    .number()
    .test(
      'len',
      'Must be exactly 8 characters',
      val => val?.toString().length === 8,
    ),
});
const expertiseValidation = yup.object().shape({ expertise: yup.string() });

const RequestValidationOnlyExpertise = yup.object().shape({
  expertise: yup.array().of(yup.string()).min(2),
});

@injectable()
class UpdateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    id,
    name,
    telephone,
    expertise,
    crm,
    cellphone,
    cep,
  }: IRequest): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(id);
    if (doctor === undefined) {
      throw new AppError("this doctor id doesn't exists");
    }

    if (expertise) {
      await expertiseValidation.validate({ expertise }).catch(function (err) {
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
        'Cardiologia clínca',
        'Cardiologia infantil',
        'Cirurgia cabeça e pescoço',
        'Cirurgia cardíaca',
        'Cirurgia de tórax',
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

      doctor.expertise = expertise;
    }

    if (name) {
      await nameValidation.validate({ name }).catch(function (err) {
        throw new AppError(err.errors[0]);
      });
      doctor.name = name;
    }
    if (telephone) {
      await telephoneValidation.validate({ telephone }).catch(function (err) {
        throw new AppError(err.errors[0]);
      });
      doctor.telephone = telephone;
    }
    if (cellphone) {
      await cellphoneValidation.validate({ cellphone }).catch(function (err) {
        throw new AppError(err.errors[0]);
      });
      doctor.cellphone = cellphone;
    }
    if (crm) {
      await crmValidation.validate({ crm }).catch(function (err) {
        throw new AppError(err.errors[0]);
      });
      doctor.crm = crm;
    }

    if (cep) {
      await cepValidation.validate({ cep }).catch(function (err) {
        throw new AppError(err.errors[0]);
      });

      const address = await axios.get(`http://cep.la/${cep}`, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (address.data.length === 0) {
        throw new AppError('This cep is invalid');
      }

      doctor.cep = cep;
      doctor.city = address.data.city;
      doctor.street = address.data.street;
      doctor.uf = address.data.uf;
      doctor.district = address.data.district;
    }

    return this.doctorsRepository.save(doctor);
  }
}

export default UpdateDoctorService;
