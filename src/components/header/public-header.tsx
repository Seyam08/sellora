"use client";

import Navbar from "@/components/header/components/nav-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/ui/useScroll";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function PublicHeader({ sticky = true }: { sticky?: boolean }) {
  const { isScrollBottom, isScrollTop, isScrollUp } = useScroll(100);

  return (
    <header>
      <div
        className={cn(
          sticky
            ? [
                "bg-background fixed inset-x-0 top-0 transition-all ease-in-out duration-300 border-0 border-border z-50",
                isScrollTop === false &&
                  isScrollUp === false &&
                  "transform -translate-y-full",
                isScrollTop === false &&
                  isScrollUp === true &&
                  "inset-x-4 top-2 shadow-sm rounded-md border",
              ]
            : "flex justify-between items-center bg-background"
        )}
      >
        <div className="flex items-center justify-between gap-3 width-holder px-4 py-3 md:px-6">
          <div>
            <div className="h-10 w-20 flex items-center">
              <Link href={"/"}>
                <Image
                  src="/sellora-logo.png"
                  alt="logo"
                  width={500}
                  height={500}
                />
              </Link>
            </div>
          </div>

          <Navbar />

          <div className="flex space-x-2 ml-auto md:ml-0">
            <div>
              <Button variant="outline">Login</Button>
            </div>
            <ModeToggle />
          </div>

          {/* <MobileMenu
          customClass={"md:hidden"}
          menuItem={publicMenu}
          color="text-white"
        /> */}
        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
