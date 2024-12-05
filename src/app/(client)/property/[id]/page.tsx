import React from 'react';
import { Property } from '~/feature/property';

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <div className="">
      <Property propertyId={params.id} />
    </div>
  );
}
