import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@proven/contracts/schemas/auth";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SocialProviders } from "./social-providers";
import { authClient } from "@proven/auth/auth-client";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "../ui/spinner";

export const SignUpForm = ({ ...props }: React.ComponentProps<"form">) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const form = useForm<SignUpInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (input: SignUpInput) => {
    setIsLoading(true);
    await authClient.signUp.email({
      name: input.name,
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
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>Name</FieldLabel>
              <Input
                disabled={isLoading}
                type="text"
                placeholder="Enter your name"
                aria-invalid={!!fieldState.error}
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
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
            Create account
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <SocialProviders disabled={isLoading} />
      </FieldGroup>
    </form>
  );
};
