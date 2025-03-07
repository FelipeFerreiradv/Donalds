import { ChefHat } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { formatCurrency } from "@/app/_untils/currenc";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { db } from "@/lib/prisma";

import FloatingButton from "../_components/floating-buttons";
import AddProdcutToShopButton from "./_components/add-product-to-shop-button";
import ProductQuantitySelector from "./_components/product-quantity-selector";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;

  const restaurant = await db.restaurant.findFirst({ where: { slug } });
  const product = await db.product.findFirst({ where: { id: productId } });

  if (!restaurant) return notFound();
  if (!product) return notFound();
  return (
    <Card className="max-w- relative h-full w-full border-none">
      <CardHeader className="relative h-96 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="z-10"
        />
      </CardHeader>
      <CardContent className="z-20 flex h-full w-full flex-col justify-center gap-2 rounded-t-3xl bg-white pt-6">
        <div className="flex items-center gap-2">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={20}
            height={20}
            className="rounded-full"
          />
          <h2 className="text-xs text-[#000000a0]">{restaurant.name}</h2>
        </div>
        <h1 className="text-lg font-semibold text-[#323232]">{product.name}</h1>
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold text-[#323232]">
            {formatCurrency(product.price)}
          </p>
          <ProductQuantitySelector />
        </div>
        <CardContent className="mt-4 flex flex-col gap-2 p-0">
          <h1 className="text-base font-semibold text-[#323232]">Sobre</h1>
          <p className="text=[#000000a0] font-light">{product.description}n</p>
        </CardContent>
        <CardContent className="mt-4 flex flex-col gap-2 p-0">
          <div className="flex items-center gap-2">
            <ChefHat width={16} height={16} />
            <h1 className="text-base font-semibold text-[#323232]">Sobre</h1>
          </div>
          {product.ingredients.map((ingredient) => (
            <li key={ingredient} className="text=[#000000a0] ml-4 font-light">
              {ingredient}
            </li>
          ))}
        </CardContent>
        <AddProdcutToShopButton />
      </CardContent>
      <CardFooter>
        <FloatingButton />
      </CardFooter>
    </Card>
  );
};

export default ProductPage;
