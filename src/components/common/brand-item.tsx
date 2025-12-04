import Image from "next/image";
import Link from "next/link";

interface BrandItemProps {
  src: string;
  alt: string;
  brand: string;
}

const BrandItem = ({ alt, src, brand }: BrandItemProps) => {
  return (
    <Link href="/" className="flex w-92 flex-col items-center gap-4">
      <div className="h-20 w-20 rounded-3xl border-2 border-gray-200 p-6">
        <Image src={src} alt={alt} width={32} height={32} />
      </div>
      <p className="text-md font-medium">{brand}</p>
    </Link>
  );
};

export default BrandItem;
