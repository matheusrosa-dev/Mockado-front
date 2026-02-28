type Props = {
  children: React.ReactNode;
};

export const Content = ({ children }: Props) => {
  return (
    <div className="p-4 py-5.5 overflow-auto w-full h-full">{children}</div>
  );
};
