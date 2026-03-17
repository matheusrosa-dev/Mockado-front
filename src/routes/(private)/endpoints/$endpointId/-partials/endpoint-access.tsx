import { useState } from "react";
import { IoCopyOutline, IoKeyOutline } from "react-icons/io5";
import { Skeleton } from "@components";
import { useToastStore } from "@shared/stores/toast";
import { ApiKeyModal } from "./api-key-modal";
import { MdOutlineRefresh } from "react-icons/md";
import { useSessionStore } from "@shared/stores";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL as string;

type Props = {
  endpointId: string;
  isLoading: boolean;
};

export function EndpointAccess({ endpointId, isLoading }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { session } = useSessionStore();
  const toast = useToastStore();

  const endpointUrl = `${BACKEND_BASE_URL}/mock/${endpointId}`;

  // TODO: ADICIONAR EM UM HELPER
  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(endpointUrl);
    toast.show({ title: "URL copied to clipboard", variant: "success" });
  };

  return (
    <>
      <ApiKeyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
                  onClick={handleCopyUrl}
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

          <Skeleton className="rounded-lg" show={isLoading}>
            <div className="flex items-center justify-between rounded-lg border border-border bg-background-tertiary px-4 py-3 gap-4">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-white/90">
                  API Key
                </span>
                <p className="text-xs text-text-muted">
                  {session?.user?.hasApiKey
                    ? "An API key is active for your account. It works across all your endpoints."
                    : "Generate a key to authenticate requests to your endpoints."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading}
                className="flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-medium 
              text-accent hover:bg-accent/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {session?.user?.hasApiKey ? (
                  <>
                    <MdOutlineRefresh className="size-4" />
                    Regenerate
                  </>
                ) : (
                  <>
                    <IoKeyOutline className="size-4" />
                    Generate API Key
                  </>
                )}
              </button>
            </div>
          </Skeleton>
        </div>
      </div>
    </>
  );
}
