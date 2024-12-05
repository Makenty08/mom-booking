'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { logout } from '~/feature/auth';
import { useRouter } from 'next/navigation';
import { Menu, CircleUser } from 'lucide-react';
export function UserDropDown() {
  const user = useAppSelector((state) => state.authSlice.user);
  const dipatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dipatch(logout());
  };
  const handleLogin = () => {
    router.push('/auth/login');
  };
  const handleSignUp = () => {
    router.push('/auth/register');
  };

  const handleRegisterProperty = () => {
    router.push('/become-a-host/about-your-place');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-4 px-4 py-2 justify-center items-center  border-2 rounded-full hover:shadow-md ">
        <Menu />
        <Avatar>
          {user ? (
            <>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>BZ</AvatarFallback>
            </>
          ) : (
            <>
              <AvatarFallback className="bg-inherit ">
                <CircleUser size={24} />
              </AvatarFallback>
            </>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 mr-20">
        {user ? (
          <LoggedInMenu handleLogout={handleLogout} />
        ) : (
          <LoggedOutMenu
            handleLogin={handleLogin}
            handleRegisterProperty={handleRegisterProperty}
            handleSignUp={handleSignUp}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface LoggedinMenuProps {
  handleLogout: () => void;
}

function LoggedInMenu({ handleLogout }: LoggedinMenuProps) {
  const router = useRouter();
  return (
    <>
      <DropdownMenuItem onClick={() => router.push('/reservations')} className="font-semibold">
        Reservations
      </DropdownMenuItem>
      <DropdownMenuItem
        className="font-semibold"
        onClick={() => router.push('/become-a-host/about-your-place')}
      >
        Add a property
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
    </>
  );
}
interface LoggedOutMenuProps {
  handleLogin: () => void;
  handleSignUp: () => void;
  handleRegisterProperty: () => void;
}

function LoggedOutMenu({ handleLogin, handleRegisterProperty, handleSignUp }: LoggedOutMenuProps) {
  return (
    <>
      <DropdownMenuItem className="font-semibold" onClick={handleLogin}>
        Login
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleSignUp}>SignUp</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleRegisterProperty}>Register your property</DropdownMenuItem>
      <DropdownMenuItem>Help Center</DropdownMenuItem>
    </>
  );
}
