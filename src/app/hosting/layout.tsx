import { MiscLayout } from '~/layouts/misc';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" className="">
      <MiscLayout>{children}</MiscLayout>
    </div>
  );
}
