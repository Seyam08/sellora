import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <Card className="w-full flex flex-col gap-6 text-center p-5 relative">
      <CardTitle>Loading Content...</CardTitle>
      <Skeleton className="h-[20px] w-full rounded-md" />
      <Skeleton className="h-[50px] w-full rounded-md" />
    </Card>
  );
}
