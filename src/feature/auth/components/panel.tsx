// General Panel Component
import React from 'react';
import Link from 'next/link';

interface PanelProps {
  children: React.ReactNode;
  welcomeMessage: React.ReactNode;
  accountMessage: React.ReactNode;
  linkPath: string;
  linkText: string;
}

export function Panel({
  children,
  welcomeMessage,
  accountMessage,
  linkPath,
  linkText,
}: PanelProps) {
  return (
    <div className="min-w-80 sm:min-w-100">
      <div className="px-4 py-8 sm:bg-white sm:rounded-xl sm:shadow-md overflow-hidden">
        {welcomeMessage}
        {children}
        <div className="text-sm text-center my-6">
          {accountMessage}{' '}
          <Link href={linkPath} className="font-semibold">
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}

interface AuthProps {
  children: React.ReactNode;
  isLoginPage: boolean;
}

export function AuthPanel({ children, isLoginPage }: AuthProps) {
  const welcomeMessage = (
    <>
      <div className="text-center text-xl font-semibold mb-1">Hi there, welcome to </div>
      <div className="text-center text-3xl font-bold tracking-wider mb-4">MOM-Booking</div>
      <div className="text-sm text-gray-400 mb-4">Book best hotel for you</div>
    </>
  );
  const accountMessage = isLoginPage ? 'No Account?' : 'Have Account?';
  const linkPath = isLoginPage ? '/auth/register' : '/auth/login';
  const linkText = isLoginPage ? 'Create one' : 'Login';

  return (
    <Panel
      welcomeMessage={welcomeMessage}
      accountMessage={accountMessage}
      linkPath={linkPath}
      linkText={linkText}
    >
      <div>{isLoginPage ? 'Login' : 'Sign up'}</div>
      {children}
    </Panel>
  );
}

interface AuthOwnerProps {
  children: React.ReactNode;
  isLoginPage: boolean;
}

export function AuthHostPanel({ children, isLoginPage }: AuthOwnerProps) {
  const welcomeMessage = (
    <>
      <div className="text-center text-lg font-bold mb-1">Welcome to</div>
      <div className="text-center text-3xl font-bold tracking-wider mb-4">MOM-Booking</div>
      <div className="text-sm text-gray-400 mb-4">Host your property</div>

      {/* <div className="border-t border-gray-200 mb-2" /> */}
    </>
  );
  const accountMessage = isLoginPage ? 'Have a property to host?' : 'Manage your properties. ';
  const linkPath = isLoginPage ? '/auth/host/register' : '/auth/host/login';
  const linkText = isLoginPage ? 'Create one' : 'Login';

  return (
    <Panel
      welcomeMessage={welcomeMessage}
      accountMessage={accountMessage}
      linkPath={linkPath}
      linkText={linkText}
    >
      {children}
    </Panel>
  );
}
