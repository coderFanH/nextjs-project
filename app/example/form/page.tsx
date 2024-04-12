import Form from '@/app/ui/invoices/create-form';
import { createInvoice } from '@/app/lib/actions';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';

export default async function Page() {
  return (
    <form action={createInvoice}>
      <div className="flex h-[300px] w-[100%] flex-col items-center justify-center">
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="mb-[50px] h-[40px] w-full border-b border-[#C4C4C4] font-serif"
          autoComplete="on"
        />
        <div className="relative mb-[50px] h-[40px] w-[100%]">
          <input
            name="password"
            placeholder="Password"
            className="h-[40px] w-[100%] border-b border-[#C4C4C4] font-serif"
            autoComplete="on"
          />
        </div>
        <button
          className="h-[40px] w-[100%] rounded-xl bg-[#A7CCCE] text-center font-serif text-[20px] leading-[40px]"
          type="submit"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}
