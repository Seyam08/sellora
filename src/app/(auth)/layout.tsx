import Logo from "@/components/logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Sellora",
  description: "E-commerce platform for buying and selling products",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-4 items-center justify-center">
        <Logo />

        {children}
      </div>
    </div>
  );
}
