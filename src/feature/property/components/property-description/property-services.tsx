import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import propertyApi from '~/api/property/api';
import { PropertyServices as hey } from '~/api/property/types';
import { PropertyServicesIcons } from '~/components/services-icons';
import { Button } from '~/components/ui/button';

type PropertyServiceKey = keyof typeof PropertyServicesIcons;

export function PropertyServices() {
  const [showMore, setShowMore] = React.useState(false);
  const [properties, setProperties] = React.useState<hey>([]);
  const params = useParams();
  const { data: property } = propertyApi.endpoints.getProperty.useQuery(
    params.id ? +params.id : skipToken,
    { skip: !params.id },
  );
  useEffect(() => {
    if (property) {
      setProperties(showMore ? property.propertyServices : property.propertyServices.slice(0, 4));
    }
  }, [property, showMore]);
  console.log(properties, 2322);

  return (
    <div className=" flex flex-col gap-4">
      <div className="font-semibold text-lg"> What is included</div>
      <div className="grid grid-cols-2 gap-x-1 gap-y-3">
        {properties.map(({ service }, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* {PropertyServicesIcons[service.]} */}
            <span>{service.name}</span>
          </div>
        ))}
      </div>

      <div>
        <Button
          variant="outline"
          className="bg-inherit font-semibold border-slate-900"
          size={'lg'}
          onClick={() => setShowMore(!showMore)}
        >
          See more..
        </Button>
      </div>
    </div>
  );
}
