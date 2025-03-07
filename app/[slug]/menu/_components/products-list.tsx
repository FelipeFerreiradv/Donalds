import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { formatCurrency } from "@/app/_untils/currenc";
import { Card, CardContent } from "@/components/ui/card";

interface ProductsListProps {
  products?: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  const [isTextFull, setIsTextFull] = useState<boolean>(false);

  const handleTextHeight = () => {
    setIsTextFull((prevState) => !prevState);
  };

  const { slug } = useParams<{ slug: string }>();
  return (
    <Card>
      {products?.map((product) => (
        <CardContent
          className="z-20 flex w-full flex-col gap-9 rounded-t-[30px] pt-6"
          key={product.id}
        >
          <div className="flex w-full items-center justify-between gap-20">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Link
                  href={`/${slug}/menu/${product.id}`}
                  className="text-xs font-medium"
                >
                  {product.name}
                </Link>
                <p className="max-w-52 text-xs text-[#000000a0]">
                  {isTextFull
                    ? product.description
                    : product.description.length > 100
                      ? product.description.slice(0, 100) + "..."
                      : product.description}
                </p>
                <p
                  className="text-[10px] text-[#000000a0] underline"
                  onClick={handleTextHeight}
                >
                  {product.description.length > 100 && "Ver amais"}
                </p>
              </div>
              <p className="text-sm font-bold">
                {formatCurrency(product.price)}
              </p>
            </div>
            <Link href={`/${slug}/menu/${product.id}`}>
              <Image
                src={product?.imageUrl || "Image not found"}
                alt={product?.name || "Image not found"}
                width={100}
                height={100}
                className="transition-all hover:scale-110"
              />
            </Link>
          </div>
        </CardContent>
      ))}
    </Card>
  );
};

export default ProductsList;
