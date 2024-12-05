import React from 'react';
import { PropertyReview } from './property-review';
export function PropertyReviews() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <PropertyReview
        src="https://github.com/shadcn.png"
        description='Amazing place and whole "village" feeling. We loved common areas as well as our
        own cosy cabin. The design, attitude, and spirit it is just stunning. More places in the
        world like this one...'
        name="Almaz Amangelding"
      />
      <PropertyReview
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        description="You can play billiards at this hotel, and free use of bicycles is available. Bayterek Monument is in 15-minute drive from Wyndham Garden Astana, while Astana Nursultan Nazarbayev International Airport is a 7-minute drive away from the property."
        name="Anuar Zhunussov"
      />
      <PropertyReview
        src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
        description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod temporaloity."
        name="Birzhan Zhunusbekov"
      />
      <PropertyReview
        src="https://github.com/shadcn.png"
        description="Decorated in modern design, rooms at this hotel are equipped with a king-size bed, a desk, a flat-screen TV, a safety deposit box and iron facilities. Smart climate control, a marble bathroom and complementary tea and coffee sets will help to relax."
        name="Islam Yesenbayev"
      />
    </div>
  );
}
