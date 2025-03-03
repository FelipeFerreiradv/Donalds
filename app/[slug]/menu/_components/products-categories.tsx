"use client";

import { Prisma } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import ProductsList from "./products-list";

interface ProductsCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: { menuCategories: { include: { products: true } } };
  }>;
}

type menuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const ProductsCategories = ({ restaurant }: ProductsCategoriesProps) => {
  const [isSelectedCategory, setIsSelectedCategory] =
    useState<menuCategoryWithProducts>(restaurant.menuCategories[0]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const handleCategoryChange = (category: menuCategoryWithProducts) => {
    setIsSelectedCategory(category);
  };

  const getCategoryButtonVariants = (category: menuCategoryWithProducts) => {
    return isSelectedCategory.id === category.id ? "default" : "secondary";
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 200;
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };
  return (
    <Card className="overflow-hidden">
      <CardContent
        ref={scrollRef}
        className="relative z-20 flex w-full items-center gap-4 overflow-hidden rounded-t-[30px] pb-2 pt-6"
      >
        <div className="flex w-full items-center gap-7">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={getCategoryButtonVariants(category)}
              className="h-8 max-w-32 rounded-full text-xs"
              onClick={() => handleCategoryChange(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          onClick={handleScroll}
          className="fixed right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <ChevronRight width={25} height={25} className="text-neutral-800" />
        </Button>
      </CardContent>
      <ScrollArea className="z-20 flex w-full flex-col gap-4 rounded-t-[30px] pt-6">
        <CardContent className="pb-2">
          <h3 className="font-bold">{isSelectedCategory.name}</h3>
        </CardContent>
        <div className="w-max flex-col gap-4">
          <ProductsList products={isSelectedCategory.products} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
};

export default ProductsCategories;
