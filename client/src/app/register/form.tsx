"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, { message: "Password should be more than 3 letters" }),
  confirmPassword: z.string(),
}).refine((data) => {
  return data.password === data.confirmPassword
}, {
  message: "Password do not match",
  path: ["confirmPassword"]

})


export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    }
  })


  const submitHandle = async (values: z.infer<typeof formSchema>) => {
    const { confirmPassword, ...rest } = values;

    await new Promise(resolve=> setTimeout(resolve, 2000));
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rest)
      })
      const data = await res.json();
      if(res.status != 200){
        throw new Error(data.error);
      }
      toast.success("Account created successfully");
      await new Promise(resolve=> setTimeout(resolve, 1000));
      window.location.href = "/login";

    } catch (error:any) {
      toast.error(error.message);
    }
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
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => {
              return <FormItem className="mt-5">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />

                </FormControl>
                <FormMessage />
              </FormItem>

            }}
          />
          <Toaster className="bg-[#eee]"/>
          <div className="w-full text-center">
            <Button disabled={form.formState.isSubmitting} className="mt-5 mx-auto">{form.formState.isSubmitting?"Registering...":"Sign Up"}</Button>
          </div>
        </form>
      </Form>
    </main>
  )
}