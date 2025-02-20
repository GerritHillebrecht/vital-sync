import { CreateWorkspaceForm } from "@/components/forms";
import { Company } from "@/models";
import HeroImage from "@/public/images/hostpital_background.jpg";
import Image from "next/image";

interface PageProps {
  params: Promise<{ company_id: Company["id"] }>;
}

export default async function Page({ params }: PageProps) {
  const { company_id } = await params;

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
        <CreateWorkspaceForm company_id={company_id} />
      </div>
    </main>
  );
}
