type Props = {
  children: React.ReactNode;
};

export function Content({ children }: Props) {
  return (
    <div className="p-4 py-5.5 overflow-auto w-full h-full">{children}</div>
  );
}
