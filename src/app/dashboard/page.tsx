import { auth } from "@/auth";
import SocialLogOut from "@/components/forms/social-auth/social-logout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function dashboard() {
  const session = await auth();
  console.log(session);
  return (
    <div className="w-full flex justify-center items-center p-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Image
            src={session?.user?.image ?? "https://github.com/shadcn.png"}
            alt="Dashboard Image"
            width={100}
            height={100}
          />

          <CardTitle>{session?.user?.name ?? "Username"}</CardTitle>
        </CardHeader>
        <CardContent>{session?.user?.email}</CardContent>

        <SocialLogOut />
      </Card>
    </div>
  );
}
