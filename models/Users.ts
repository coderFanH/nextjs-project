import mongoose from 'mongoose';
import basePlugin from './base_model';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    root: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: String,
    },
  },
  { timestamps: true },
);

UserSchema.plugin(basePlugin);
const User = mongoose.models.user || mongoose.model('user', UserSchema);

export default User;
