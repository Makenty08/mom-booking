import React from 'react';
import { AuthHostPanel, RegistrationForm } from '~/feature/auth';

export default function RegistrationOwnerPage() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <AuthHostPanel isLoginPage={false}>
        <RegistrationForm isClient={false} />
      </AuthHostPanel>
    </div>
  );
}
