import { Product } from "@prisma/client";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

interface ProductsListProps {
  product?: Pick<Product, "name" | "description" | "imageUrl">;
}

const ProductsList = ({ product }: ProductsListProps) => {
  return (
    <Card>
      <CardContent className="z-20 flex w-full flex-col gap-9 rounded-t-[30px] pt-6">
        <h1 className="text-sm font-bold">Lançamentos</h1>

        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xs font-medium">
                McOferta Média Big Mac Duplo
              </h2>
              <p className="text-xs text-[#000000a0]">
                Quatro hambúrgueres (100% carne bovina), alface americana...
              </p>
            </div>
            <p className="text-sm font-bold">R4 39,00</p>
          </div>
          {product?.imageUrl ? (
            <Image
              src={product?.imageUrl || "Image not found"}
              alt={product?.name || "Image not found"}
              width={100}
              height={100}
            />
          ) : (
            <p className="text-center">Image not found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsList;
