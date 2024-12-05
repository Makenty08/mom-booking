'use client';

import React from 'react';
import { ChevronLeft, Heart, Share } from 'lucide-react';
import { useRouter } from 'next/navigation';
export function MobileSubHeader() {
  const router = useRouter();
  return (
    <div className="flex justify-between h-16 items-center px-4">
      <div
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeft size={24} />
      </div>
      <div className="flex gap-4">
        <Heart size={24} />
        <Share size={24} />
      </div>
    </div>
  );
}
