import PublicHeader from "@/components/header/public-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sellora",
  description: "E-commerce platform for buying and selling products",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <PublicHeader />
      </div>

      <main>{children}</main>
      <div>
        <footer>
          <h1 className="text-lg text-lime-600">Footer</h1>
        </footer>
      </div>
    </>
  );
}
