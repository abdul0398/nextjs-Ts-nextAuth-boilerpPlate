'use client'
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Logout(){

    const router = useRouter();
    return (
        <Button className="mt-3" onClick={async ()=>{
            await signOut({
                callbackUrl: "/login"
            })
        }}>
            Sign Out
        </Button>
      
    )
}