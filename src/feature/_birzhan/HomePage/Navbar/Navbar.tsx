'use client';
import React from 'react';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChangingLanguage } from '~/feature/_birzhan/ChangingLanguage';
import { Profile } from '~/feature/_birzhan/Profile';

const pages = [
  { name: 'Home', href: '#' },
  { name: 'All Hotels', href: '#' },
  { name: 'Countries', href: '#' },
  { name: 'Explore Cities', href: '#' },
  { name: 'About Us', href: '#' },
];

export const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-pink-50 shadow-sm outline-none">
      <div className="container max-w-[78rem] ">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-8 flex">
              <Image
                src="/static/Sanatopia.svg"
                width={100}
                height={100}
                alt="Sanatopia"
                priority
              />
            </div>
            <div className="hidden md:flex space-x-4">
              {pages.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className="text-gray-600 hover:text-gray-900 font-semibold whitespace-nowrap"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
          <ChangingLanguage />

          <div className="hidden md:flex space-x-4 items-center">
            <Button onClick={() => router.push('/auth')} variant="link">
              Sign In
            </Button>
            <Button onClick={() => router.push('/auth/registration')}>Sign Up</Button>
            <Profile />
          </div>
          <div className="md:hidden flex">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="ml-1"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                ></path>
              </svg>
            </button>
          </div>
        </nav>
        <div
          ref={ref}
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } bg-gradient-to-r from-gray-50 to-pink-50`}
        >
          {pages.map((page) => (
            <Link
              key={page.name}
              href={page.href}
              className="block py-2 px-4 text-gray-600 hover:text-gray-900"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
