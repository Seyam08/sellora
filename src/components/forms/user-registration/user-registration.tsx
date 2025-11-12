"use client";
import { registerUser } from "@/components/forms/fetcher/fetcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { ZodClientSchema } from "@/schemas/client.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleMinus } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import z from "zod";

// extend schema
const ExtendedZodClientSchema = ZodClientSchema.extend({
  confirmPassword: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `Please confirm your password.`
          : `${issue.path} should be ${issue.expected}.`,
    })
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter.")
    .regex(/[0-9]/, "Password must contain a number."),
}).refine(
  (data) => {
    if (data.password !== data.confirmPassword) {
      return false;
    }
    return true;
  },
  {
    error: "Passwords must match.",
    path: ["confirmPassword"],
  }
);

export function UserRegistrationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    data,
    error,
    isMutating,
    trigger,
    reset: SWRreset,
  } = useSWRMutation("api/register", registerUser);
  const form = useForm<z.infer<typeof ExtendedZodClientSchema>>({
    resolver: zodResolver(ExtendedZodClientSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: "",
      avatar: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof ExtendedZodClientSchema>) {
    const { setError, clearErrors, reset } = form;

    try {
      // Prepare form data
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "confirmPassword") return;
        if (value instanceof File) formData.append(key, value);
        else if (value !== undefined && value !== null)
          formData.append(key, String(value));
      });

      // Trigger the mutation
      const result = await trigger(formData);

      // If successful
      reset();
      clearErrors();
      SWRreset();
      toast.success(result.message);
    } catch (err: any) {
      //  Error thrown from registerUser()
      const message = err?.message ?? "Something went wrong";
      const fields = err?.fields ?? {};

      if (fields.email)
        setError("email", { message: `${fields.email} - ${message}` });

      if (fields.username)
        setError("username", { message: `${fields.username} - ${message}` });

      if (fields.phoneNumber)
        setError("phoneNumber", {
          message: `${fields.phoneNumber} - ${message}`,
        });

      toast.error(message);
    }
  }

  return (
    <div className={cn("w-full flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Fill the form tho create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* full name  */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Jhon Doe"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {/* username  */}
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Jhon@1"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* email  */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. JhonDoe@gmail.com"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* password  */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {/* confirm password  */}
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Phone Number  */}
              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. +8801234567899"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* address  */}
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* avatar */}
              <Controller
                control={form.control}
                name="avatar"
                render={({ field, fieldState }) => {
                  const { onChange } = field;
                  const selectedFile = form.watch("avatar");
                  const fileUrl = selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : null;
                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Avatar</FieldLabel>

                      {fileUrl ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Avatar className="!size-8">
                              <AvatarImage
                                src={fileUrl}
                                alt={selectedFile?.name}
                              />
                              <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-1">
                            <Button
                              size="sm"
                              className="bg-red-400 hover:bg-red-500 transition-all cursor-pointer text-white shadow-xs"
                              onClick={() => {
                                form.setValue("avatar", undefined);
                              }}
                            >
                              <CircleMinus />
                            </Button>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Input
                          id="avatar"
                          type="file"
                          onChange={(e) => onChange(e.target.files?.[0])}
                        />
                      )}

                      <FieldDescription>
                        {selectedFile
                          ? selectedFile?.name
                          : "Please upload a picture of yours."}
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* submit button  */}
              <Field>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isMutating}
                >
                  {isMutating ? (
                    <>
                      Creating... <Spinner />
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
