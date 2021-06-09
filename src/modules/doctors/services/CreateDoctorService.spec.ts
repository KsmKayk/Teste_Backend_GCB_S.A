import AppError from '@shared/errors/AppError';

import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';
import CreateDoctorService from './CreateDoctorService';

let createDoctor: CreateDoctorService;

describe('CreateDoctor', () => {
  beforeEach(() => {
    let fakeDoctorsRepository = new FakeDoctorsRepository();
    createDoctor = new CreateDoctorService(fakeDoctorsRepository);
  });

  it('should be able to create a new doctor', async () => {
    const doctor = await createDoctor.execute({
      name: 'kayk',
      cellphone: 1234567890,
      telephone: 12345678901,
      cep: 25025320,
      crm: 1234567,
      expertise: 'cardiologista, ortopedista',
    });

    expect(doctor).toHaveProperty('id');
  });
});
