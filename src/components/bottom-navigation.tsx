'use client';
import React, { useEffect, useState } from 'react';
import { Search, Heart, User } from 'lucide-react';
import { useScrollDirection } from 'react-use-scroll-direction';

export const BottomNavigation = () => {
  const { isScrollingDown, isScrollingUp } = useScrollDirection();
  const [scrolledDown, setscrolledDown] = useState(false);

  useEffect(() => {
    if (isScrollingDown) {
      setscrolledDown(true);
    }
    if (isScrollingUp) {
      setscrolledDown(false);
    }
  }, [isScrollingDown, isScrollingUp]);

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full h-16 bg-white transition-transform duration-300 ease-linear ${
        scrolledDown ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto ">
        <div className="flex flex-col items-center justify-center">
          <Search size={24} />
          <span className="text-sm">Search</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Heart size={24} />
          <span className="text-sm">Saved</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <User size={24} />
          <span className="text-sm">Login</span>
        </div>
      </div>
    </div>
  );
};
