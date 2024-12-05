import Image from 'next/image';

export function DirectionCard() {
  return (
    <div className="w-[122px]">
      <Image
        className="rounded-[12px] border-2"
        src="https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320"
        alt="search"
        width={122}
        height={122}
      />
      <div className="text-xs font-normal mt-2 text-center">Flexible Search</div>
    </div>
  );
}
