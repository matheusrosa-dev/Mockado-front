type Props = {
  children: React.ReactNode;
};

export const Header = ({ children }: Props) => {
  return (
    <header className="bg-[#010409] max-h-17 h-17 p-4 text-2xl font-medium border-l-2 border-b-2 border-[#0d1117]">
      {children}
    </header>
  );
};
