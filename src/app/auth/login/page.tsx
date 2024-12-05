import React from 'react';
import { LoginForm } from '~/feature/auth/components/login-form';
import { AuthPanel } from '~/feature/auth';

export default function AuthPage() {
  return (
    <div className="grid h-screen place-content-center ">
      <AuthPanel isLoginPage={true}>
        <LoginForm isClient={true} />
      </AuthPanel>
    </div>
  );
}
