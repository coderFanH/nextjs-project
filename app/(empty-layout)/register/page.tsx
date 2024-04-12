'use client';

import { useState } from 'react';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { register } from '@/store/services';

export default function Page() {
  const [showPassword, setShowPassword] = useState(true);
  const [isError, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errMes, setErrMes] = useState('');

  const submitHander = async (e) => {
    e.preventDefault();
    register(formData).catch((err) => {
      setError(true);
      setErrMes(err.response.data.message);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-[60%] flex-col items-center justify-center">
      <div className="text-left font-mono text-[28px] text-black">
        Create Account
      </div>
      <form action="register" onSubmit={submitHander}>
        <div className="flex h-[300px] w-[100%] flex-col items-center justify-center">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="mb-[50px] h-[40px] w-full border-b border-[#C4C4C4] font-serif"
            onChange={handleChange}
            autoComplete="on"
            value={formData.email}
          />
          <div className="relative mb-[50px] h-[40px] w-[100%]">
            <input
              type={showPassword ? 'password' : 'text'}
              name="password"
              placeholder="Password"
              className="h-[40px] w-[100%] border-b border-[#C4C4C4] font-serif"
              onChange={handleChange}
              value={formData.password}
              autoComplete="on"
            />
            {!showPassword ? (
              <EyeSlashIcon
                width={20}
                height={20}
                className="absolute right-[5px] top-[10px] text-[#C4C4C4]"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeIcon
                width={20}
                height={20}
                className="absolute  right-[5px] top-[10px] text-[#C4C4C4]"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div
            className="h-[40px] w-[100%] rounded-xl bg-[#A7CCCE] text-center font-serif text-[20px] leading-[40px]"
            onClick={submitHander}
          >
            Create Account
          </div>
        </div>
      </form>
      <div className="mt-[10px] w-[100%] text-left">
        Already have an account?
        <Link href={'/login'} className="pl-[5px] text-[#A7CCCE]">
          Log in
        </Link>
      </div>
      {isError && <div className="w-100 h-100">{errMes}</div>}
    </div>
  );
}
