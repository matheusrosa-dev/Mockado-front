import { Dialog } from "radix-ui";
import { IoWarning } from "react-icons/io5";

type Props = {
  open: boolean;
  onStay: () => void;
  onLeave: () => void;
};

export function UnsavedChangesModal({ open, onStay, onLeave }: Props) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-[fade-in_150ms_ease-out]" />

        <Dialog.Content
          onEscapeKeyDown={onStay}
          onInteractOutside={onStay}
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2
            rounded-xl border border-border bg-background-tertiary p-6 shadow-2xl
            data-[state=open]:animate-[fade-in_150ms_ease-out]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-method-patch/10 border border-method-patch/20">
                <IoWarning className="text-lg text-method-patch" />
              </div>

              <div className="flex flex-col gap-1">
                <Dialog.Title className="text-sm font-semibold text-white/90">
                  Unsaved changes
                </Dialog.Title>
                <Dialog.Description className="text-xs text-text-muted leading-relaxed">
                  You have unsaved changes. If you leave this page, your changes
                  will be lost.
                </Dialog.Description>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-1">
              <button
                type="button"
                onClick={onStay}
                className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-text-muted
                  hover:text-white/90 hover:border-white/20 transition-colors cursor-pointer"
              >
                Stay on page
              </button>

              <button
                type="button"
                onClick={onLeave}
                className="rounded-lg border border-error/30 bg-error/10 px-4 py-2 text-xs font-medium
                  text-error hover:bg-error/20 transition-colors cursor-pointer"
              >
                Leave without saving
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
