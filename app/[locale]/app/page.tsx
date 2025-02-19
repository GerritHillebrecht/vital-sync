import { Companies } from "./_components/companies-selector";

export default async function Page() {
  console.log("Rendering Layout /app/[locale]/app/page.tsx");

  return (
    <div>
      <Companies />
    </div>
  );
}
