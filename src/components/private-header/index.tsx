import { Sidebar } from "../sidebar";

type Props = {
  children: React.ReactNode;
};

export function PrivateHeader({ children }: Props) {
  return (
    <header className="bg-background-secondary max-h-14 h-14 px-2 lg:px-5 flex items-center border-b border-border select-none">
      <Sidebar.HamburgerButton />
      <span className="text-base font-semibold text-white/90 tracking-tight">
        {children}
      </span>
    </header>
  );
}
