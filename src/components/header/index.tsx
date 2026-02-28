type Props = {
  children: React.ReactNode;
};

export const Header = ({ children }: Props) => {
  return (
    <header className="bg-[#010409] p-4 text-2xl font-medium border-l border-[#0d1117]">
      {children}
    </header>
  );
};
