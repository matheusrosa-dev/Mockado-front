type Props = {
  children: React.ReactNode;
};

export const Header = ({ children }: Props) => {
  return (
    <header className="bg-background-secondary max-h-17 h-17 p-4 text-2xl font-medium border-l-2 border-b-2 border-background-primary select-none">
      {children}
    </header>
  );
};
