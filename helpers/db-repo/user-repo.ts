import bcrypt from 'bcryptjs';

import { auth, db } from '../';
import { User } from '@/models';

const getOne = async (id: string) => {
  await db.connect();
  const user = await User.findOne(id).lean().exec();
  await db.disconnect();
  return user;
};

const authenticate = async ({ email, password }) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }
  const token = auth.createAccessToken({ id: user._id });
  return {
    user: {
      email: user.email,
      role: user.role,
      root: user.root,
    },
    token,
  };
};

const create = async (params) => {
  const { email, password } = params;
  await db.connect();
  if (await User.findOne({ email })) {
    const userExistsError = new Error('email "' + email + '" 账户已存在');
    userExistsError.email = 'UserExistsError';
    throw userExistsError;
  }
  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ email, password: hashPassword });
  await newUser.save();
  await db.disconnect();
  const token = auth.createAccessToken({ id: newUser._id });

  return {
    user: {
      email: newUser.email,
      role: newUser.role,
      root: newUser.root,
    },
    token,
  };
};

export const userRepo = {
  getOne,
  authenticate,
  create,
};
