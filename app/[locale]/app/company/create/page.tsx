import { CreateCompanyForm } from "@/components/forms";
import HeroImage from "@/public/images/hostpital_background.jpg";
import Image from "next/image";

export default async function Page() {
  return (
    <main className="py-10 relative">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={HeroImage}
          alt="Hero Image"
          layout="fill"
          className="object-cover blur-[3px] scale-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-transparent" />
      </div>
      <div className="container mx-auto">
        <CreateCompanyForm />
      </div>
    </main>
  );
}
