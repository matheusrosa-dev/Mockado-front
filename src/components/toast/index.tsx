import { Toast as ToastRadix } from "radix-ui";
import { useState } from "react";
import {
  IoAlertCircle,
  IoCheckmarkCircle,
  IoClose,
  IoInformationCircle,
  IoWarning,
} from "react-icons/io5";
import type { ToastData, ToastVariant } from "./types";
import { useToastStore } from "@shared/stores/toast";

const VARIANT_CONFIG: Record<
  NonNullable<ToastVariant>,
  {
    Icon: React.ElementType;
    borderClass: string;
    iconClass: string;
  }
> = {
  default: {
    Icon: IoInformationCircle,
    borderClass: "border-border",
    iconClass: "text-text-muted",
  },
  success: {
    Icon: IoCheckmarkCircle,
    borderClass: "border-method-post",
    iconClass: "text-method-post",
  },
  error: {
    Icon: IoAlertCircle,
    borderClass: "border-error",
    iconClass: "text-error",
  },
  warning: {
    Icon: IoWarning,
    borderClass: "border-method-patch",
    iconClass: "text-method-patch",
  },
};

type ItemProps = ToastData & { onDismiss: (id: string) => void };

function ToastItem({
  id,
  title,
  description,
  variant = "default",
  onDismiss,
}: ItemProps) {
  const [open, setOpen] = useState(true);
  const { Icon, borderClass, iconClass } = VARIANT_CONFIG[variant];

  return (
    <ToastRadix.Root
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setTimeout(() => onDismiss(id), 300);
      }}
      duration={4000}
      className={`cursor-grab flex items-start gap-3 rounded-lg border bg-background-tertiary p-4 shadow-lg
        data-[state=open]:animate-[toast-slide-in-right_200ms_ease-out]
        data-[state=closed]:animate-[toast-slide-out-right_200ms_ease-in_forwards]
        data-[swipe=cancel]:translate-x-0
        data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)
        data-[swipe=end]:animate-[toast-swipe-out_100ms_ease-out_forwards]
        ${borderClass}`}
    >
      <Icon className={`mt-0.5 shrink-0 text-lg ${iconClass}`} />

      <div className="flex-1 min-w-0">
        <ToastRadix.Title className="text-sm font-semibold text-white/90">
          {title}
        </ToastRadix.Title>

        {description && (
          <ToastRadix.Description className="mt-0.5 text-xs text-text-muted whitespace-pre-wrap leading-4.5 font-medium">
            {description}
          </ToastRadix.Description>
        )}
      </div>

      <ToastRadix.Close asChild>
        <button
          type="button"
          className="shrink-0 text-text-subtle hover:text-white/90 transition-colors cursor-pointer"
          aria-label="Fechar notificação"
        >
          <IoClose className="text-base" />
        </button>
      </ToastRadix.Close>
    </ToastRadix.Root>
  );
}

export function Toast() {
  const { toasts, dismiss } = useToastStore();

  return (
    <ToastRadix.Provider swipeDirection="right">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onDismiss={dismiss} />
      ))}
      <ToastRadix.Viewport className="fixed bottom-0 right-0 flex flex-col gap-2 p-6 w-97.5 max-w-[100vw] z-60 outline-none" />
    </ToastRadix.Provider>
  );
}
