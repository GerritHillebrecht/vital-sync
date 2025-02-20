import { CreateWorkspaceForm } from "@/components/forms";
import { Company } from "@/models";

interface PageProps {
  params: Promise<{ company_id: Company["id"] }>;
}

export default async function Page({ params }: PageProps) {
  const { company_id } = await params;
  return (
    <div>
      Your first workspace
      <CreateWorkspaceForm company_id={company_id} />
    </div>
  );
}
