import { twMerge } from "tailwind-merge";

type Props = {
  show: boolean;
  containerClassName?: string;
  className?: string;
  children: React.ReactNode;
};

export function Skeleton({
  className = "",
  containerClassName = "",
  show,
  children,
}: Props) {
  if (!show) return children;

  return (
    <div className={twMerge("relative", containerClassName)}>
      <span className={twMerge("absolute inset-0 skeleton", className)} />

      <div className="opacity-0">{children}</div>
    </div>
  );
}
