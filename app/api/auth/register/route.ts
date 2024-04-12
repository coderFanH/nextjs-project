import joi from 'joi';

import { userRepo } from '@/helpers/db-repo';
import { apiHandler, setJson } from '@/helpers/api';

const register = apiHandler(
  async (req) => {
    const body = await req.json();
    console.log('bod', body);
    const result = await userRepo.create(body);
    return setJson({
      data: result,
    });
  },
  {
    schema: joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    }),
  },
);

export const POST = register;
export const dynamic = 'force-dynamic';
