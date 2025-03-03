import { Product } from "@prisma/client";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import FloatingButton from "../menu/_components/floating-buttons";

interface ProductPageProps {
  product?: Product[];
}

const ProductPage = ({ product }: ProductPageProps) => {
  return (
    <Card className="h-full w-full border-none">
      <CardHeader className="relative h-52 w-full">
        <Image
          src={product?.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="z-10"
        />
      </CardHeader>
      <CardContent className="relative z-20 -mt-4 flex h-full w-full flex-col justify-center gap-4 rounded-t-3xl bg-white pt-6"></CardContent>
      <CardFooter>
        <FloatingButton />
      </CardFooter>
    </Card>
  );
};

export default ProductPage;
