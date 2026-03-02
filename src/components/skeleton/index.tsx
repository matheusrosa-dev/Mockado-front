import { twMerge } from "tailwind-merge";

type Props = {
  show: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Skeleton({ className = "", show, children }: Props) {
  if (!show) return children;

  return (
    <div className="relative">
      <span className={twMerge("absolute inset-0 skeleton", className)} />

      <div className="opacity-0">{children}</div>
    </div>
  );
}
