import mongoose from 'mongoose';

const basePlugin = (schema) => {
  schema.set('toJSON', {
    getters: true,
    virtuals: true,
  });
  schema.set('toObject', { getters: true });
};

export default basePlugin;
