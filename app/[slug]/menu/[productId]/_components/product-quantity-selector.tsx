"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ProductQuantitySelector = () => {
  const [productQuantity, setProductQuantity] = useState<number>(1);

  const toggleQuantity = () => {
    setProductQuantity((productQuantity) => productQuantity - 1);

    if (productQuantity <= 1) setProductQuantity(1);
  };
  const toggleQuantityAddicion = () => {
    setProductQuantity((productQuantity) => productQuantity + 1);
  };
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-0">
        <Button
          variant="ghost"
          className="rounded-radius flex h-8 w-8 items-center justify-center"
          onClick={toggleQuantity}
        >
          <ChevronLeft width={25} height={25} className="text-neutral-800" />
        </Button>
        <p>{productQuantity}</p>
        <Button
          variant="ghost"
          className="rounded-radius flex h-8 w-8 items-center justify-center bg-[#D52B1E]"
          onClick={toggleQuantityAddicion}
        >
          <ChevronRight width={25} height={25} className="text-white" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductQuantitySelector;
