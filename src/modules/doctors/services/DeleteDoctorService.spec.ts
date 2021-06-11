import AppError from '@shared/errors/AppError';

import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';
import CreateDoctorService from './CreateDoctorService';
import DeleteDoctorService from './DeleteDoctorService';
import FindAllDoctorsService from './FindAllDoctorsService';

let createDoctor: CreateDoctorService;
let deleteDoctor: DeleteDoctorService;
let findAllDoctors: FindAllDoctorsService;

describe('SoftDelete Doctor', () => {
  beforeEach(() => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    createDoctor = new CreateDoctorService(fakeDoctorsRepository);
    deleteDoctor = new DeleteDoctorService(fakeDoctorsRepository);
    findAllDoctors = new FindAllDoctorsService(fakeDoctorsRepository);
  });

  it('should be able to delete a doctor', async () => {
    const doctor = await createDoctor.execute({
      name: 'kayk',
      cellphone: 12345678901,
      telephone: 1234567890,
      cep: 25025320,
      crm: 1234567,
      expertise: 'Alergologia,Angiologia',
    });

    await createDoctor.execute({
      name: 'kayk',
      cellphone: 12345678901,
      telephone: 1234567890,
      cep: 25025320,
      crm: 1234567,
      expertise: 'Alergologia,Angiologia',
    });

    await deleteDoctor.execute({ id: doctor.id });

    const doctors = await findAllDoctors.execute();

    expect(doctors.length).toBe(1);
  });
  it('should not be able to delete a doctor if id doesn"t exists', async () => {
    const doctor = await createDoctor.execute({
      name: 'kayk',
      cellphone: 12345678901,
      telephone: 1234567890,
      cep: 25025320,
      crm: 1234567,
      expertise: 'Alergologia,Angiologia',
    });

    await createDoctor.execute({
      name: 'kayk',
      cellphone: 12345678901,
      telephone: 1234567890,
      cep: 25025320,
      crm: 1234567,
      expertise: 'Alergologia,Angiologia',
    });

    await expect(deleteDoctor.execute({ id: '123' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
