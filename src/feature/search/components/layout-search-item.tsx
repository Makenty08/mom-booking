import { cn } from '~/lib/utils';

export function LayoutSearchItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        'flex flex-col cursor-pointer hover:bg-[#EBEBEB] rounded-full w-full',
        className,
      )}
    >
      {children}
    </label>
  );
}
