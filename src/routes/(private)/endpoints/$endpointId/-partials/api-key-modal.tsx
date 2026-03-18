import { Dialog } from "radix-ui";
import { IoWarning, IoKeyOutline, IoCopyOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useGetApiKey } from "@services/me/react-query";
import { useSessionStore } from "@shared/stores";
import { Skeleton } from "@components";
import { copyToClipboard } from "@shared/helpers/clipboard";

type ModalPhase = null | "confirm-regenerate" | "show-key";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

//TODO: ADICIONAR ANIMAÇÃO
export function ApiKeyModal({ isOpen, onClose }: Props) {
  const [modalPhase, setModalPhase] = useState<ModalPhase>(null);
  const [apiKey, setApiKey] = useState<string>("");

  const { session, setHasApiKey } = useSessionStore();
  const { getApiKey, isLoading } = useGetApiKey({
    onSuccess: (key) => {
      setApiKey(key);
      setHasApiKey();
    },
    onError: onClose,
  });

  const onConfirmRegenerate = () => {
    setModalPhase("show-key");
    getApiKey();
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <it only needs to run when the modal opens>
  useEffect(() => {
    if (!isOpen) {
      setModalPhase(null);
      setApiKey("");
      return;
    }

    if (session?.user?.hasApiKey) {
      setModalPhase("confirm-regenerate");
      return;
    }

    setModalPhase("show-key");
    getApiKey();
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-[fade-in_150ms_ease-out]" />

        <Dialog.Content
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2
            rounded-xl border border-border bg-background-tertiary p-6 shadow-2xl
            data-[state=open]:animate-[fade-in_150ms_ease-out]"
        >
          {modalPhase === "confirm-regenerate" && (
            <ConfirmRegenerateContent
              onClose={onClose}
              onConfirmRegenerate={onConfirmRegenerate}
            />
          )}

          {modalPhase === "show-key" && (
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                  <IoKeyOutline className="text-lg text-accent" />
                </div>

                <div className="flex flex-col gap-1">
                  <Dialog.Title className="text-sm font-semibold text-white/90">
                    API Key Generated
                  </Dialog.Title>
                  <Dialog.Description className="text-xs text-text-muted leading-relaxed">
                    Copy and store your API key securely.{" "}
                    <span className="text-error font-medium">
                      This is the only time you'll be able to see it.
                    </span>
                  </Dialog.Description>
                </div>
              </div>

              <div className="flex gap-2">
                <Skeleton
                  show={isLoading}
                  className="rounded-lg"
                  containerClassName="flex-1"
                >
                  <input
                    readOnly
                    value={apiKey}
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                    className="flex-1 min-w-0 rounded-lg border border-border bg-background-primary px-3 py-2 text-sm font-mono text-white/80 cursor-text"
                  />
                </Skeleton>

                <Skeleton className="rounded-lg flex-1" show={isLoading}>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard({
                        text: apiKey,
                        toastMessage: "API key copied to clipboard",
                      })
                    }
                    disabled={isLoading}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-background-primary px-3 py-2 text-xs font-medium 
                    text-text-muted hover:text-white/90 hover:border-white/20 transition-colors not-disabled:cursor-pointer shrink-0"
                  >
                    <IoCopyOutline className="text-sm" />
                    Copy
                  </button>
                </Skeleton>
              </div>

              <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3">
                <p className="text-xs text-text-muted leading-relaxed">
                  <span className="font-medium text-error">Warning:</span> This
                  key will not be shown again. If you lose it, you'll need to
                  generate a new one, which will invalidate your current key.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-accent/10 border border-accent/30 px-4 py-2 text-xs font-medium text-accent
                    hover:bg-accent/20 hover:border-accent/50 duration-150 cursor-pointer"
                >
                  I've saved my key
                </button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const ConfirmRegenerateContent = (props: {
  onClose: () => void;
  onConfirmRegenerate: () => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-error/10 border border-error/30">
          <IoWarning className="text-lg text-error" />
        </div>

        <div className="flex flex-col gap-1">
          <Dialog.Title className="text-sm font-semibold text-white/90">
            Regenerate API Key?
          </Dialog.Title>
          <Dialog.Description className="text-xs text-text-muted leading-relaxed">
            This will{" "}
            <span className="text-white/80 font-medium">
              permanently invalidate
            </span>{" "}
            your current API key. Any requests using the old key will stop
            working immediately.
          </Dialog.Description>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-1">
        <button
          type="button"
          onClick={props.onClose}
          className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-text-muted
                    hover:text-white/90 hover:border-white/20 transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={props.onConfirmRegenerate}
          className="rounded-lg border border-error/30 bg-error/10 px-4 py-2 text-xs font-medium
                    text-error hover:bg-error/20 transition-colors cursor-pointer"
        >
          Yes, regenerate
        </button>
      </div>
    </div>
  );
};
