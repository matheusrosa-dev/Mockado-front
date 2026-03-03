import { LuRefreshCw, LuTriangleAlert } from "react-icons/lu";

type Props = {
  title: string;
  refetch: () => void;
};

export const FetchError = ({ title, refetch }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-error/30 bg-error/10 p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error/10">
        <LuTriangleAlert className="text-error text-2xl" />
      </div>
      <div>
        <p className="text-sm font-medium text-error">{title}</p>
        <p className="mt-1 text-xs text-text-muted">
          An error occurred while fetching the required data.
        </p>
      </div>

      <button
        type="button"
        onClick={refetch}
        className="mt-1 flex cursor-pointer items-center gap-1.5 rounded-md border border-error/40 bg-error/10 
        px-3 py-1.5 text-xs font-medium text-error transition-colors hover:bg-error/20 active:scale-95"
      >
        <LuRefreshCw className="text-sm" />
        Try again
      </button>
    </div>
  );
};
