type Props = {
  children: React.ReactNode;
};

export function Content({ children }: Props) {
  return <div className="flex-1 p-6 overflow-auto">{children}</div>;
}
