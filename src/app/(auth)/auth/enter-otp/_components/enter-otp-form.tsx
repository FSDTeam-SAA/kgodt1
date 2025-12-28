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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  otp: z.string(),
});

type FormType = z.infer<typeof formSchema>;

const EnterOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      otp: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async (payload: FormType) => {
      const requestBody = email ? { ...payload, email } : payload;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-email`,
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

      return data;
    },

    onSuccess: async (data) => {
      toast.success(data?.message);

      if (email) {
        const encodedEmail = encodeURIComponent(email);
        router.push(`/auth/reset-password?email=${encodedEmail}`);
      } else {
        router.push("/auth/reset-password");
      }
    },

    onError: async (error) => {
      toast.error(error?.message);
      form.setValue("otp", "");
    },
  });

  async function onSubmit(payload: FormType) {
    console.log("payload: ", payload);

    try {
      await mutateAsync(payload);
    } catch (error) {
      console.error(`OTP verification error: ${error}`);
    }
  }

  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Email not found. Please go back to forgot password page.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to resend OTP");
      }

      toast.success("OTP resent successfully!");
      form.setValue("otp", "");
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Login failed");
    } finally {
      setLoading(false);
    }
  };

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
            An OTP has been sent to your email address please verify it below
          </h5>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">OTP</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    <InputOTPGroup className="space-x-6">
                      <InputOTPSlot
                        index={0}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                      <InputOTPSlot
                        index={1}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                      <InputOTPSlot
                        index={2}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                      <InputOTPSlot
                        index={3}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                      <InputOTPSlot
                        index={4}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                      <InputOTPSlot
                        index={5}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                    </InputOTPGroup>
                  </InputOTP>
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

                <span>Verify</span>
              </span>
            ) : (
              `Verify`
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-5 space-y-3">
        <div className="text-center flex items-center justify-center gap-2">
          <p className="text-sm text-gray-600">Didn&apos;t receive OTP?</p>
          <button
            type="button"
            onClick={handleResendOTP}
            className="font-semibold hover:underline text-black disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!email}
          >
            {loading ? "Resend OTP..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterOtpForm;
