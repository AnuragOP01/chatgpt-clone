"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import * as z from "zod";
import { Button } from "../ui/button";

function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    setError(undefined);
    setSuccess(undefined);

    const result = await signIn("credentials", {
      redirect: true, // Prevent auto-redirect
      email: data.email,
      password: data.password,
    });

    if(result) {
      console.log("Hello world",startTransition);
      
      router.push("/chat")
    }
    
  }

  return (
    <div className="flex min-h-screen ">
      {/* Left side with login form */}
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
        
          {/* Login Form */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8">Login to your account</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="text-sm font-medium mb-1">Email</div>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john.snow@gmail.com"
                          className="h-12 rounded-md border-gray-300"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="text-sm font-medium mb-1">Password</div>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="********"
                            className="h-12 rounded-md border-gray-300"
                            type={showPassword ? "text" : "password"}
                            disabled={isPending}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Button asChild variant="link" size="sm" className="px-0 text-sm text-blue-600">
                  <Link href="/auth/forgot-password">Forgot password?</Link>
                </Button>
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-[#1B2B65] text-white rounded-md font-medium hover:bg-[#152451] transition-colors"
              >
                {isPending ? "Loading..." : "Login now"}
              </button>

              <div className="text-center">
                <Link 
                  href="/auth/register" 
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Don&apos;t have an account? <span className="text-blue-600">Register Instead</span>
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right side with illustration */}
      <div className="w-1/2 bg-[#1B2B65]  flex items-center justify-center">
        {/* <div className="max-w-lg"> */}
          {/* <h2 className="text-3xl font-bold text-white mb-8">Uniform Management System</h2> */}
          {/* <div className="relative"> */}
            <img
            alt="img"
            src="https://images.pexels.com/photos/18069157/pexels-photo-18069157/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-the-process-used-by-text-to-image-diffusion-models-it-was-created-by-linus-zoll-as-part-of-the-visualising-ai.png?auto=compress&cs=tinysrgb&w=600"
            height={250}
            width={500}
            className=" rounded-full"
            />
           
            
          {/* </div> */}
        </div>
      {/* </div> */}
    </div>
  );
}

export default LoginForm;