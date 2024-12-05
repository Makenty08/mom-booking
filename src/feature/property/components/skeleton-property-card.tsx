import { Skeleton } from '~/components/ui/skeleton';

export function SkeletonOwnerPropertyCard() {
  return (
    <div className="w-full aspect-[4/3] mt-2">
      <div className="relative">
        <Skeleton className="w-full h-[300px] rounded-xl" />
      </div>
      <div className="mt-2">
        <Skeleton className="w-[200px] h-[20px]" />
      </div>
      <div className="flex justify-between mt-2">
        <Skeleton className="w-[300px] h-[24px]" />
      </div>
      <div className="mt-2">
        {' '}
        <Skeleton className="w-[180px] h-[24px]" />
      </div>
    </div>
  );
}
