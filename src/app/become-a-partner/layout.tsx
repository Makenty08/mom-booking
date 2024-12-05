export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" className=" px-5 h-screen pt-10">
      <div className=" space-y-5 ">
        <div className="space-y-5">
          <div className="text-center text-3xl font-semibold">
            {'Welcome to Sanatopia, Future Partner!'}
          </div>
          <div className="text-center text-xl text-slate-500">Apply for a coorporate discount</div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
