import AppError from '@shared/errors/AppError';

import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';
import CreateDoctorService from './CreateDoctorService';
import UpdateDoctorService from './UpdateDoctorService';

let createDoctor: CreateDoctorService;
let updateDoctor: UpdateDoctorService;

describe('UpdateDoctor', () => {
  beforeEach(() => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    createDoctor = new CreateDoctorService(fakeDoctorsRepository);
    updateDoctor = new UpdateDoctorService(fakeDoctorsRepository);
  });

  it('should be able to update a doctor', async () => {
    const doctor = await createDoctor.execute({
      name: 'kayk',
      cellphone: 12345678901,
      telephone: 1234567890,
      cep: 25025320,
      crm: 1234567,
      expertise: 'Alergologia,Angiologia',
    });

    const updatedDoctor = await updateDoctor.execute({
      id: doctor.id,
      name: 'kayk2',
      cellphone: 12344678901,
      telephone: 1234467890,
      crm: 1234467,
    });

    expect(updatedDoctor.name).toBe('kayk2');
    expect(updatedDoctor.cellphone).toBe(12344678901);
    expect(updatedDoctor.telephone).toBe(1234467890);
    expect(updatedDoctor.crm).toBe(1234467);
  });
});
