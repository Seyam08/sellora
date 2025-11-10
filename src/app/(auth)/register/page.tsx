import { UserRegistrationForm } from "@/components/forms/user-registration/user-registration";

export default async function Register() {
  await new Promise((resolve) => setTimeout(() => resolve("ds"), 2000));
  return <UserRegistrationForm />;
}
