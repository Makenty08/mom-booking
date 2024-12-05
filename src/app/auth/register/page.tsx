import React from 'react';
import { AuthPanel, RegistrationForm } from '~/feature/auth';

export default function RegistrationPage() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <AuthPanel isLoginPage={false}>
        <RegistrationForm isClient={true} />
      </AuthPanel>
    </div>
  );
}
