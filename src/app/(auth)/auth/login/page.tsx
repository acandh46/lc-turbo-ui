"use client";
import { AuthSchemaType, userAuthSchema } from "@/schemas/user.schema";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import ButtonLoading from "@/components/CustomUi/ButtonLoading";
import { toast } from "sonner";
import api from "@/lib/api";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const DRAGON_IMAGE_URL = "/img/dragon.webp";

export default function LoginPage() {
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const { login } = useAuthStore();
   const router = useRouter();

   const form = useForm<AuthSchemaType>({
      resolver: zodResolver(userAuthSchema),
      defaultValues: {
         username: "",
         password: "",
      },
   });

   const onSubmit = async (dto: AuthSchemaType) => {
      setLoading(true);
      try {
         const { data } = await api.post("/auth/login", { ...dto });
         if (data.status) {
            login(data); // Pass the correct data object
            toast.success("Login successful!", {
               position: "top-right",
            });
            router.push("/dashboard"); // Redirect to dashboard
         } else {
            toast.error(data.msg, { position: "top-right" });
         }
      } catch (error: unknown) {
         if (error instanceof Error) {
            console.log(error.message);
         } else {
            console.log("An unknown error occurred:", error);
         }
         toast.error("An unexpected error occurred. Please try again.", {
            position: "top-right",
         });
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-900 p-4">
         <div className="absolute -bottom-1/2 -right-1/2 h-[800px] w-[800px] animate-[spin_240s_linear_infinite] opacity-10">
            <Image
               src="/globe.svg"
               alt="Globe"
               layout="fill"
               objectFit="contain"
            />
         </div>

         <div className="w-full max-w-md">
            <Card className="border-slate-700 bg-slate-800/60 text-white shadow-2xl shadow-slate-950/50 backdrop-blur-sm">
               <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex items-center justify-center">
                     <Image
                        className="h-16 w-16 object-contain drop-shadow-lg"
                        src={DRAGON_IMAGE_URL}
                        width={64}
                        height={64}
                        alt="Turbo Agent Logo"
                        priority
                     />
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight text-slate-50">
                     Turbo Agent Dashboard
                  </CardTitle>
                  <p className="text-sm text-slate-400">
                     Welcome back! Please sign in to continue.
                  </p>
               </CardHeader>
               <CardContent>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                     >
                        <FormField
                           control={form.control}
                           name="username"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="font-semibold text-slate-300">
                                    Username
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       autoFocus
                                       disabled={loading}
                                       placeholder="e.g., john.doe"
                                       className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
                                       {...field}
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
                                 <div className="flex items-center justify-between">
                                    <FormLabel className="font-semibold text-slate-300">
                                       Password
                                    </FormLabel>
                                 </div>
                                 <FormControl>
                                    <div className="relative">
                                       <Input
                                          disabled={loading}
                                          type={
                                             showPassword ? "text" : "password"
                                          }
                                          placeholder="••••••••"
                                          {...field}
                                          className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
                                       />
                                       <button
                                          type="button"
                                          tabIndex={-1}
                                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer transition hover:text-slate-200"
                                          onClick={() =>
                                             setShowPassword((prev) => !prev)
                                          }
                                       >
                                          {showPassword ? (
                                             <EyeOff className="h-5 w-5" />
                                          ) : (
                                             <Eye className="h-5 w-5" />
                                          )}
                                       </button>
                                    </div>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <ButtonLoading
                           loading={loading}
                           type="submit"
                           className="w-full bg-sky-600 font-semibold text-white hover:bg-sky-700"
                        >
                           {loading ? "Signing In..." : "Sign In"}
                        </ButtonLoading>
                     </form>
                  </Form>
               </CardContent>
            </Card>
            <footer className="mt-8 text-center text-xs text-slate-500">
               &copy; {new Date().getFullYear()} Turbo. All Rights Reserved.
            </footer>
         </div>
      </div>
   );
}
