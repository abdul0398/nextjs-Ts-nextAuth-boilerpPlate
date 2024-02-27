"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {signIn} from "next-auth/react"
import { Toaster, toast } from "sonner";
import {useRouter } from 'next/navigation'


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, { message: "Password should be more than 3 letters" })
})



export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });


  const submitHandle = async (values: z.infer<typeof formSchema>) => {
    const response = await signIn('credentials', {
      redirect: false,
      ...values
    });
    if(response?.status != 200) {
      toast.error("Invlaid email or password");
      return;
    }
    router.refresh();
  };



  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandle)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}

          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => {
              return <FormItem className="mt-5">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />

                </FormControl>
                <FormMessage />
              </FormItem>
            }}

          />
          <div className="w-full text-center">
            <Button className="mt-5 mx-auto">Login</Button>
          </div>
        </form>
      </Form>
      <Toaster/>

    </main>
  )
}