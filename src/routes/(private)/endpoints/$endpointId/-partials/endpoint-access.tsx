import { IoCopyOutline } from "react-icons/io5";
import { Skeleton } from "@components";
import { copyToClipboard } from "@shared/helpers/clipboard";

type Props = {
  endpointId: string;
  isLoading: boolean;
};

export function EndpointAccess({ endpointId, isLoading }: Props) {
  const endpointUrl = `${window.location.origin}/api/mock/${endpointId}`;

  return (
    <div className="rounded-lg border border-border bg-background-secondary p-5 flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest">
        Endpoint URL
      </h2>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2">
            <Skeleton
              show={isLoading}
              className="rounded-lg"
              containerClassName="flex-1"
            >
              <input
                readOnly
                value={endpointUrl}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="w-full rounded-lg border border-border bg-background-tertiary px-3 py-2 text-sm text-white/70 font-mono cursor-default"
              />
            </Skeleton>

            <Skeleton className="rounded-lg" show={isLoading}>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard({
                    text: endpointUrl,
                    toastMessage: "URL copied to clipboard",
                  })
                }
                disabled={isLoading}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-background-tertiary px-3 py-2 text-xs font-medium 
                text-text-muted hover:text-white/90 hover:border-white/20 transition-colors cursor-pointer disabled:opacity-50 
                disabled:cursor-not-allowed"
              >
                <IoCopyOutline />
                Copy
              </button>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
