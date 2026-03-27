import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInInput } from "@proven/contracts/schemas/auth";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SocialProviders } from "./social-providers";
import { authClient } from "@proven/auth/auth-client";
import { toast } from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "../ui/spinner";

export const SignInForm = ({ ...props }: React.ComponentProps<"form">) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const form = useForm<SignInInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = async (input: SignInInput) => {
    setIsLoading(true);
    await authClient.signIn.email({
      email: input.email,
      password: input.password,
      fetchOptions: {
        onError: (error) => {
          setIsLoading(false);
          toast.error(error.error.message);
        },
        onSuccess: () => {
          setIsLoading(false);
          void navigate({ to: "/app" });
        },
      },
    });
  };
  return (
    <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>Email</FieldLabel>
              <Input
                disabled={isLoading}
                type="email"
                placeholder="Enter your email"
                aria-invalid={!!fieldState.error}
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>Password</FieldLabel>
              <Input
                disabled={isLoading}
                type="password"
                placeholder="Enter your password"
                aria-invalid={!!fieldState.error}
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Field>
          <Button type="submit" disabled={!form.formState.isValid || isLoading} className="w-full">
            {isLoading && <Spinner />}
            Sign In
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <SocialProviders disabled={isLoading} />
      </FieldGroup>
    </form>
  );
};
