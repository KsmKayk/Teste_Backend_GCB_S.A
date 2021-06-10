import AppError from '@shared/errors/AppError';

import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';
import CreateDoctorService from './CreateDoctorService';

let createDoctor: CreateDoctorService;

describe('CreateDoctor', () => {
  beforeEach(() => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    createDoctor = new CreateDoctorService(fakeDoctorsRepository);
  });

  it('should be able to create a new doctor', async () => {
    const doctor = await createDoctor.execute({
      name: 'kayk',
      cellphone: 12345678901,
      telephone: 1234567890,
      cep: 25025320,
      crm: 1234567,
      expertise: 'Alergologia,Angiologia',
    });

    expect(doctor).toHaveProperty('id');
  });

  it('should not be able to create a new doctor when name have more than 120 chars or less than 3', async () => {
    await expect(
      createDoctor.execute({
        name:
          'teste-nome-120-chars-teste-nome-120-chars-teste-nome-120-chars-teste-nome-120-chars-teste-nome-120-chars-teste-nome-120-chars',
        cellphone: 12345678901,
        telephone: 1234567890,
        cep: 25025320,
        crm: 1234567,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createDoctor.execute({
        name: '',
        cellphone: 12345678901,
        telephone: 1234567890,
        cep: 25025320,
        crm: 1234567,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor when crm have more or less than 7 chars', async () => {
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 12345678901,
        telephone: 1234567890,
        cep: 25025320,
        crm: 12345678,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 12345678901,
        telephone: 1234567890,
        cep: 25025320,
        crm: 123456,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor when telephone have more or less than 10 chars', async () => {
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 12345678901,
        telephone: 12345678901,
        cep: 25025320,
        crm: 1234567,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 12345678901,
        telephone: 123456789,
        cep: 25025320,
        crm: 1234567,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor when cellphone have more or less than 11 chars', async () => {
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 123456789012,
        telephone: 1234567890,
        cep: 25025320,
        crm: 1234567,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 1234567890,
        telephone: 1234567890,
        cep: 25025320,
        crm: 1234567,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor when cep have more or less than 8 chars', async () => {
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 12345678901,
        telephone: 1234567890,
        cep: 250253201,
        crm: 1234567,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 12345678901,
        telephone: 1234567890,
        cep: 2502532,
        crm: 1234567,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor if cep is invalid', async () => {
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 12345678901,
        telephone: 1234567890,
        cep: 10000000,
        crm: 1234567,
        expertise: 'Alergologia,Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor with less than 2 expertises', async () => {
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 12345678901,
        telephone: 1234567890,
        cep: 25025320,
        crm: 1234567,
        expertise: 'Alergologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor if expertises are not separated by a comma', async () => {
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 12345678901,
        telephone: 1234567890,
        cep: 25025320,
        crm: 1234567,
        expertise: 'Alergologia Angiologia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor if sended expertises are incompatible with indexed expertises', async () => {
    await expect(
      createDoctor.execute({
        name: 'kayk',
        cellphone: 12345678901,
        telephone: 1234567890,
        cep: 25025320,
        crm: 1234567,
        expertise: 'Cardio, Neuro',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
