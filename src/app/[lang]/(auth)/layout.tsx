import { getUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AtuhLayout({ children }: { children: LayoutProps<'/'> }) {
  const user = await getUserSession();
  if (user) {
    redirect('/profile');
  }
  return (
    <>
      {children}
    </>
  );
}