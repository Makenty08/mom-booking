import React from 'react';
import { PropertyInfo } from './property-info';
import { PropertyServices } from './property-services';

export function PropertyDescription() {
  return (
    <div className=" grid grid-cols-1 gap-8">
      <PropertyInfo />
      <PropertyServices />
    </div>
  );
}
