import { getServerSession } from "next-auth";
import LoginForm  from "./form";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();
  if (session) {
      redirect("/");
  }
  return (
    <div className="h-full w-full px-0 flex items-center">
      <div className="lg:w-1/4 bg-[#eee] shadow-lg rounded-md px-4 py-8 w-10/12 md:1/3 mx-auto h-fit">
        <LoginForm/>
      </div>
    </div>
  )
}