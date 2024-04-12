'use server';

import { z } from 'zod';
import mongoose from 'mongoose';
import { auth, db } from '@/helpers';
import { User } from '@/models';

const FormSchema = z.object({
  _id: z.string(),
  email: z.string(),
  password: z.string(),
});

const CreateInvoice = FormSchema.omit({ _id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { email, password } = CreateInvoice.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  await db.connect();
  const newUser = new User({ email, password });
  await newUser.save();
  await db.disconnect();
}
