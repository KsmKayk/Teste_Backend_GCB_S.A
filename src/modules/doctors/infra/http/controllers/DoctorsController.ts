import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';

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
}
