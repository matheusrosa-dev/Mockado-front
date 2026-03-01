type Props = {
  children: React.ReactNode;
};

export function Content({ children }: Props) {
  return <div className="flex-1 p-2 lg:p-5 overflow-auto">{children}</div>;
}
