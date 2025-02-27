"use client";

import { Prisma } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProductsCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: { menuCategories: true };
  }>;
}

const ProductsCategories = ({ restaurant }: ProductsCategoriesProps) => {
  return (
    <Card>
      <CardContent className="z-20 flex w-full flex-col gap-4 rounded-t-[30px] pt-6">
        <div className="flex w-full items-center gap-7">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              variant="default"
              className="h-8 max-w-32 rounded-full text-xs"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </CardContent>
      <ScrollArea className="z-20 flex w-full flex-col gap-4 rounded-t-[30px] pt-6">
        <div className="flex w-max gap-4"></div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
};

export default ProductsCategories;
