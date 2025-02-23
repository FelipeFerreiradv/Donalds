import Image from "next/image";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { db } from "../../lib/prisma";
import ConsumptionMethodOption from "./_components/consumption-method-option";

interface InicialpageProps {
  params: Promise<{ slug: string }>;
}

const Inicialpage = async ({ params }: InicialpageProps) => {
  const { slug } = await params;

  const restaurant = await db.restaurant.findFirst({ where: { slug } });

  if (!restaurant) return notFound();
  return (
    <Card className="flex h-full w-full flex-col items-center justify-center gap-28 overflow-hidden pb-64 pt-24">
      <CardHeader className="flex flex-col items-center gap-4">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={85}
          height={85}
        />
        <CardTitle className="text-xl font-semibold">
          {restaurant.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6">
        <CardTitle className="text-3xl font-semibold text-stone-800">
          Seja bem-vindo!
        </CardTitle>
        <CardDescription className="text-md max-w-[325px] text-center">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </CardDescription>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-center gap-20">
        <ConsumptionMethodOption
          slug={slug}
          option="DINE_IN"
          cosumptionMethod="Para comer aqui"
          imageUri="/sandwich.png"
          iamgeAlt="Sanduíche"
        />
        <ConsumptionMethodOption
          slug={slug}
          option="TAKEAWAY"
          cosumptionMethod="Para levar"
          imageUri="/takeaway.png"
          iamgeAlt="Para levar"
        />
      </CardFooter>
    </Card>
  );
};

export default Inicialpage;
