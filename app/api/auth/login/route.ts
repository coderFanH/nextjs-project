import joi from 'joi';

import { userRepo } from '@/helpers/db-repo';
import { apiHandler, setJson } from '@/helpers/api';

const login = apiHandler(
  async (req) => {
    const body = await req.json();
    const result = await userRepo.authenticate(body);
    return setJson({
      data: result,
      message: '登录成功',
    });
  },
  {
    schema: joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    }),
  },
);

export const POST = login;
export const dynamic = 'force-dynamic';
