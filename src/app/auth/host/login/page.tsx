import React from 'react';
import { LoginForm, AuthHostPanel } from '~/feature/auth';

export default function AuthOwnerPage() {
  return (
    <div className="grid h-screen place-content-center ">
      <AuthHostPanel isLoginPage={true}>
        <LoginForm isClient={false} />
      </AuthHostPanel>
    </div>
  );
}
