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
    <div className="width-holder">
      <div>Auth sellora</div>
      <main>{children}</main>
    </div>
  );
}
