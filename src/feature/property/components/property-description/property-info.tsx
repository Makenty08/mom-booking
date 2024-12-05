import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'next/navigation';
import React from 'react';
import propertyApi from '~/api/property/api';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
export function PropertyInfo() {
  const [showMore, setShowMore] = React.useState(false);
  const params = useParams();
  const { data: property } = propertyApi.endpoints.getProperty.useQuery(
    params.id ? +params.id : skipToken,
    { skip: !params.id },
  );
  return (
    <div>
      <div className={cn('text-neutral-900', !showMore && 'line-clamp-2')}>
        {property?.description}
      </div>

      <Button
        variant={'link'}
        className="p-0 font-bold text-base"
        onClick={() => setShowMore(!showMore)}
      >
        Show more
      </Button>
    </div>
  );
}
