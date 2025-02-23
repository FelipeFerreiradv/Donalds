import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "../../lib/prisma";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await db.restaurant.findFirst({ where: { slug } });

  if (!restaurant) {
    return notFound();
  }
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-52 overflow-hidden py-52">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={150}
          height={150}
        />
        <h1 className="text-4xl font-semibold">{restaurant.name}</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-6xl font-semibold">Seja bem-vindo!</h2>
        <p className="max-w-[525px] text-center text-2xl">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>
      <div className="flex items-center gap-64">
        <Link
          href="#"
          className="flex cursor-pointer flex-col items-center justify-center gap-32 transition-all hover:scale-110"
        >
          <Image
            src="/sandwich.png"
            alt="sandwich"
            width={200}
            height={200}
            objectFit="cover"
          />
          <p className="text-3xl font-semibold">Para comer aqui</p>
        </Link>
        <Link
          href="#"
          className="flex cursor-pointer flex-col items-center justify-center gap-32 transition-all hover:scale-110"
        >
          <Image
            src="/package-sanswich.png"
            alt="sandwich"
            width={200}
            height={200}
            objectFit="cover"
          />
          <p className="text-3xl font-semibold">Para levar</p>
        </Link>
      </div>
    </section>
  );
};

export default RestaurantPage;
