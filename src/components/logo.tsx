import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="h-10 w-20 flex items-center">
      <Link href={"/"}>
        <Image
          src="/logo/sellora-dark.png"
          alt="sellora"
          width={100}
          height={50}
          className="hidden dark:block"
        />
        <Image
          src="/logo/sellora-light.png"
          alt="sellora"
          width={100}
          height={50}
          className="block dark:hidden"
        />
      </Link>
    </div>
  );
}
