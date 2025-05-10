"use client"
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { IoEye, IoEyeOff } from "react-icons/io5";
import * as z from "zod";
import MainButton from "../common/MainButton";

const FormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormProps = {
  text: string;
};

function RegisterForm({ text }: RegisterFormProps) {
  // const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  
  // const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setError(undefined);
    setSuccess(undefined);
    // setLoading(true);
    console.log(startTransition , text);
    
    try {
      const api = '/api/auth/register'

      const response = await fetch(api, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        }),
      });

      if(!response.ok){
        toast.success("Registered Successfully")
      }

    } catch {
      setError("Something went wrong!");
    } finally {
      // setLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col gap-[2.81rem] justify-center items-center h-screen px-4 lg:px-[4rem] lg:mr-16">
      <div className='flex w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 p-8 flex flex-col justify-center space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Full name"
                    {...field}
                    className="h-[3.75rem] w-full rounded-large"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="h-[3.75rem] w-full rounded-large"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    {...field}
                    className="h-[3.75rem] w-full rounded-large"
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
              <div className="relative">
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      className="h-[3.75rem] w-full rounded-large"
                      type={showPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-2xl opacity-55"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </span>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <div className="relative">
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      {...field}
                      className="h-[3.75rem] w-full rounded-large"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-2xl opacity-55"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                </span>
              </div>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <MainButton
            text="Register"
            classes="h-[3.31rem] rounded-large"
            width="full_width"
            isSubmitable
            isLoading={isPending}
          />
          
          <div className="flex justify-center font-bold text-[14px] dark:text-white text-[#191A15] mt-4">
            <Link href="/auth/signin">Login Instead?</Link>
          </div>
          
        </form>
        
      </Form>
      <div className="w-1/2 bg-[#1B2B65]  flex items-center justify-center rounded-md">
        
            <img
            alt="img"
            src="https://images.pexels.com/photos/18069157/pexels-photo-18069157/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-the-process-used-by-text-to-image-diffusion-models-it-was-created-by-linus-zoll-as-part-of-the-visualising-ai.png?auto=compress&cs=tinysrgb&w=600"
            height={250}
            width={500}
            className=" rounded-full"
            />
           
        </div>
      
      </div>
    </div>
  );
}

export default RegisterForm;