import { RegistrationLayout } from '~/layouts/property-registration';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" className="">
      <RegistrationLayout>{children}</RegistrationLayout>
    </div>
  );
}
