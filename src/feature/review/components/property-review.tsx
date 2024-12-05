import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Star } from 'lucide-react';

export function PropertyReview({
  src,
  name,
  description,
}: {
  src: string;
  name: string;
  description: string;
}) {
  return (
    <div className="p-4 space-y-4 border rounded-2xl">
      <div className=" flex items-center justify-between ">
        <div className=" flex items-center gap-4">
          <Avatar>
            <>
              <AvatarImage src={src} />
              <AvatarFallback>AS</AvatarFallback>
            </>
          </Avatar>
          <div className="font-semibold">{name}</div>
        </div>

        <div className="flex items-center gap-2">
          <Star fill="black" size={16} /> <span className="text-sm">4.69</span>
        </div>
      </div>

      <div>{description}</div>

      <Button variant="link" className="p-0">
        Show more
      </Button>
    </div>
  );
}
