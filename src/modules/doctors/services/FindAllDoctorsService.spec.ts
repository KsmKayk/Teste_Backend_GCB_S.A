// import AppError from '@shared/errors/AppError';

import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';
import CreateDoctorService from './CreateDoctorService';
import FindAllDoctorsService from './FindAllDoctorsService';

let createDoctor: CreateDoctorService;
let findAllDoctors: FindAllDoctorsService;

describe('FindDoctors', () => {
  beforeEach(() => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    createDoctor = new CreateDoctorService(fakeDoctorsRepository);
    findAllDoctors = new FindAllDoctorsService(fakeDoctorsRepository);
  });

  it('should be able to find all doctors', async () => {
    await createDoctor.execute({
      name: 'kayk',
      cellphone: 12345678901,
      telephone: 1234567890,
      cep: 25025320,
      crm: 1234567,
      expertise: 'Alergologia,Angiologia',
    });

    await createDoctor.execute({
      name: 'kayk2',
      cellphone: 12345678902,
      telephone: 1234567891,
      cep: 25025320,
      crm: 1234568,
      expertise: 'Alergologia,Angiologia',
    });

    const doctors = await findAllDoctors.execute();

    expect(doctors[0]).toHaveProperty('id');
    expect(doctors[1]).toHaveProperty('id');
  });
});
