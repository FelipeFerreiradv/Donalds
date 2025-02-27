import { Clock, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { db } from "@/lib/prisma";

import FloatingButton from "./_components/floating-buttons";
import ProductsCategories from "./_components/products-categories";

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

  const restaurant = await db.restaurant.findFirst({
    where: { slug },
    include: { menuCategories: { include: { products: true } } },
  });

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
          className="z-10"
        />
      </CardHeader>
      <CardContent className="relative z-20 -mt-4 flex h-full w-full flex-col justify-center gap-4 rounded-t-3xl bg-white pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              width={45}
              height={45}
            />
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{restaurant.name}</h1>
              <h2 className="text-sm">{restaurant.description}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star
              width={12}
              height={12}
              className="fill-primary text-primary"
            />
            <p className="text-sm">5.0</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock width={12} height={12} className="text-green-500" />
          <p className="text-sm text-green-500">Aberto</p>
        </div>
      </CardContent>
      <ProductsCategories restaurant={restaurant} />
      <CardFooter>
        <FloatingButton />
      </CardFooter>
    </Card>
  );
};

export default RestaurantDashboardPage;
