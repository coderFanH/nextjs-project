import Image from 'next/legacy/image';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-row bg-[#B1D9DB]">
      <div className="relative w-[40%]">
        <Image src="/loginLogo.png" alt="loginLogo" width={100} height={100} />
        <div className="p-[20px] font-mono text-[25px] text-white">
          A Next.js project for progress
        </div>
        <Image
          src="/login.png"
          width={700}
          height={600}
          alt="login"
          className="absolute left-[20%]"
        />
      </div>
      <div className="flex flex-1 items-center justify-center rounded-l-3xl bg-white">
        {children}
      </div>
    </div>
  );
}
