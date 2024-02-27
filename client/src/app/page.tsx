import Link from "next/link";
import { getServerSession } from "next-auth";
import Logout from "@/ui/logout";

export default async function Home() {
  const session = await getServerSession();
  
  return (
    <div className="h-full w-full flex place-content-center">
      {session &&
      <Logout/>        
      }
      {
        !session && 
        <Link href="/login">
          Login
        </Link>
      }
    </div>
  );
}
