import { LoginForm } from "@/components/forms/auth/login/login-form";
import heroImage from "@/public/images/hero-bg-image-3.jpg";
import Image from "next/image";
import { setStaticParamsLocale } from "next-international/server";

import { Logo } from "@/components/ui/logo";

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  
  return (
    <div className="flex relative z-10 min-h-svh flex-col items-center justify-center gap-6 px-6 md:px-10 overflow-hidden">
      <Image
        src={heroImage}
        alt="Hero image"
        fill={true}
        className="blur-sm scale-105 object-cover"
      />
      <div className="flex w-full max-w-sm flex-col gap-6 z-10">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Logo className="text-black" />
        </a>

        <LoginForm />
      </div>
    </div>
  );
}
