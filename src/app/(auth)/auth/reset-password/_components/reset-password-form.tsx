"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import ResetSuccessModal from "./reset-success-modal";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormType = z.infer<typeof formSchema>;

const ResetPasswordForm = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (payload: FormType) => {
      const requestBody = email ? { ...payload, email } : payload;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Something went wrong");
      }

      return await data;
    },

    onSuccess: async () => {
      setIsSuccessModalOpen(true);
    },

    onError: async (error) => {
      toast.error(error?.message);
    },
  });

  async function onSubmit(payload: FormType) {
    try {
      await mutateAsync(payload);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  }

  return (
    <div className="bg-white p-8 rounded-xl space-y-8">
      <div className="text-center">
        <div>
          <Image
            src={"/logo.png"}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-16 w-16 object-cover mx-auto"
          />
          <h1 className="text-3xl font-bold text-primary mt-4 mb-1">MDS-AI™</h1>
          <h5 className="font-medium opacity-50">
            Please create your new MDS-AI Password.
          </h5>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter Password"
                    {...field}
                    className="h-[50px] bg-[#eaeaea] "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Re-enter Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter Password"
                    {...field}
                    className="h-[50px] bg-[#eaeaea] "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            type="submit"
            className="w-full h-[50px] disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center gap-1">
                <span>
                  <Spinner />
                </span>

                <span>Continue</span>
              </span>
            ) : (
              `Continue`
            )}
          </Button>
        </form>
      </Form>

      {
        <ResetSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      }
    </div>
  );
};

export default ResetPasswordForm;
