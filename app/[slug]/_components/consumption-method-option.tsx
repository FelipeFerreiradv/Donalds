import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ConsumptionMethodOptionProps {
  slug: string;
  cosumptionMethod: string;
  imageUri: string;
  iamgeAlt: string;
  option: ConsumptionMethod;
}

const ConsumptionMethodOption = ({
  slug,
  cosumptionMethod,
  imageUri,
  iamgeAlt,
  option,
}: ConsumptionMethodOptionProps) => {
  return (
    <Link
      href={`/${slug}/menu?consumptionMethod=${option}`}
      className="flex cursor-pointer flex-col items-center justify-center gap-12 transition-all hover:scale-110"
    >
      <Image
        src={imageUri}
        alt={iamgeAlt}
        width={80}
        height={80}
        objectFit="cover"
      />
      <p className="text-md font-semibold">{cosumptionMethod}</p>
    </Link>
  );
};

export default ConsumptionMethodOption;
