'use client';

import { useState } from 'react';
import { EyeSlashIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { login } from '@/store/services';
import { setCookie } from '@/utils';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHander = async () => {
    const { data } = await login(formData);
    setCookie('token', data.token);
    router.replace('/dashboard');
  };

  return (
    <div className="w-[60%] flex-col items-center justify-center">
      <div className="text-left font-mono text-[28px] text-black">Log In</div>
      <form action="register">
        <div className="flex h-[300px] w-[100%] flex-col items-center justify-center">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="on"
            className="mb-[50px] h-[40px] w-full border-b border-[#C4C4C4] font-serif"
          />
          <div className="relative mb-[50px] h-[40px] w-[100%]">
            <input
              type={showPassword ? 'password' : 'text'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="on"
              className="h-[40px] w-[100%] border-b border-[#C4C4C4] font-serif"
            />
            {!showPassword ? (
              <EyeSlashIcon
                width={20}
                height={20}
                className="absolute right-[5px] top-[10px] cursor-pointer text-[#C4C4C4]"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeIcon
                width={20}
                height={20}
                className="absolute  right-[5px] top-[10px] cursor-pointer text-[#C4C4C4]"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div
            className="h-[40px] w-[100%] cursor-pointer rounded-xl bg-[#A7CCCE] text-center font-serif text-[20px] leading-[40px]"
            onClick={submitHander}
          >
            Log In
          </div>
        </div>
      </form>
      <div className="mt-[10px] w-[100%] text-left">
        Do not have an account?
        <Link href={'/register'} className="pl-[5px] text-[#A7CCCE]">
          register
        </Link>
      </div>
    </div>
  );
}
