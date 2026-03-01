type Props = {
  children: React.ReactNode;
};

export function Header({ children }: Props) {
  return (
    <header className="bg-background-secondary max-h-14 h-14 px-5 flex items-center border-b border-border select-none">
      <span className="text-base font-semibold text-white/90 tracking-tight">
        {children}
      </span>
    </header>
  );
}
