"use client";

import { ChevronLeft, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FloatingButton = () => {
  const router = useRouter();

  return (
    <Card className="absolute left-0 top-4 flex w-full items-center justify-between border-none bg-transparent px-4">
      <Button
        variant="default"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
      >
        <ChevronLeft
          width={25}
          height={25}
          className="text-neutral-800"
          onClick={() => router.back()}
        />
      </Button>
      <Button
        variant="default"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
      >
        <ScrollText width={18} height={18} className="text-neutral-800" />
      </Button>
    </Card>
  );
};

export default FloatingButton;
