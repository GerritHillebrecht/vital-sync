import { CreateAccountForm } from "@/components/forms";
import CanvasComponent from "@/components/ui/canvas";
import { getAccountByAuthID, getUser } from "@/lib/data-access";
import { redirect } from "next/navigation";

export default async function Page() {
  const {
    data: { user },
    error,
  } = await getUser();

  if (error || !user) {
    console.error(error);
    redirect("/auth/login");
  }

  const { data: account } = await getAccountByAuthID(user.id);

  if (account) {
    redirect("/app");
  }

  return (
    <main className="pb-10">
      <section>
        <div className="container mx-auto">
          <div className="grid grid-cols-2">
            <div className="py-10">
              <CreateAccountForm user={user} />
            </div>
            <CanvasComponent />
          </div>
        </div>
      </section>
    </main>
  );
}
