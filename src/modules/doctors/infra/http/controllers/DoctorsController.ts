import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import FindAllDoctorsService from '@modules/doctors/services/FindAllDoctorsService';
import DeleteDoctorService from '@modules/doctors/services/DeleteDoctorService';
import UpdateDoctorService from '@modules/doctors/services/UpdateDoctorService';
import FindDoctorsService from '@modules/doctors/services/FindDoctorsService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, telephone, expertise, crm, cellphone, cep } = request.body;

    const createDoctor = container.resolve(CreateDoctorService);

    const doctor = await createDoctor.execute({
      name,
      telephone,
      expertise,
      crm,
      cellphone,
      cep,
    });

    return response.json(doctor);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllDoctors = container.resolve(FindAllDoctorsService);

    const doctors = await findAllDoctors.execute();

    return response.json(doctors);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const softDeleteDoctor = container.resolve(DeleteDoctorService);
    const { id } = request.params;
    const res = await softDeleteDoctor.execute({ id });
    return response.json(res);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, telephone, cellphone, cep, crm, expertise } = request.body;
    const updateDoctor = container.resolve(UpdateDoctorService);
    const doctor = await updateDoctor.execute({
      id,
      name,
      telephone,
      cellphone,
      cep,
      crm,
      expertise,
    });
    return response.json(doctor);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { type, value } = request.params;
    const findDoctor = container.resolve(FindDoctorsService);
    const doctor = await findDoctor.execute({ type, value });
    return response.json(doctor);
  }
}
