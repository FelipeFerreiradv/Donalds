import Image from "next/image";
import { notFound } from "next/navigation";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/prisma";

import FloatingButton from "./_components/floating-buttons";

interface RestaurantDashboardPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMetodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKE_AWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantDashboardPage = async ({
  params,
  searchParams,
}: RestaurantDashboardPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  const restaurant = await db.restaurant.findFirst({ where: { slug } });

  if (!isConsumptionMetodValid(consumptionMethod)) return notFound();
  if (!restaurant) return notFound();
  return (
    <Card className="h-full w-full border-none">
      <CardHeader className="relative h-52 w-full">
        <Image
          src={restaurant?.coverImageUrl}
          alt={restaurant.name}
          layout="fill"
          objectFit="cover"
        />
      </CardHeader>
      <CardFooter>
        <FloatingButton />
      </CardFooter>
    </Card>
  );
};

export default RestaurantDashboardPage;
