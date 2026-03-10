import { GoogleLogin } from "@react-oauth/google";
import { Dialog } from "radix-ui";
import { LuBraces } from "react-icons/lu";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: Props) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background-secondary/80 backdrop-blur-sm data-[state=closed]:animate-[fade-out_150ms_ease-in]" />

        <Dialog.Content
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-12 data-[state=closed]:animate-[fade-out_150ms_ease-in]"
        >
          <div className="w-full max-w-sm flex flex-col gap-8 bg-background-secondary border border-border rounded-xl p-8 shadow-2xl">
            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center"
                aria-hidden="true"
              >
                <LuBraces className="w-7 h-7 text-accent" />
              </div>

              <button
                className="bg-white cursor-pointer"
                type="button"
                onClick={onClose}
              >
                fechar
              </button>

              <div className="flex flex-col gap-1.5">
                <Dialog.Title className="text-xl font-semibold text-white/90 tracking-tight">
                  Welcome to Mockado
                </Dialog.Title>
                <Dialog.Description className="text-sm text-text-muted max-w-xs">
                  Sign in to manage your mock API endpoints and accelerate your
                  development workflow.
                </Dialog.Description>
              </div>
            </div>

            <hr className="border-border" />

            <div className="flex flex-col gap-4">
              <GoogleLogin
                theme="filled_black"
                text="continue_with"
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
              />

              <p className="text-xs text-text-subtle text-center leading-relaxed">
                By continuing, you agree to our{" "}
                <span className="text-text-muted">Terms of Service</span> and{" "}
                <span className="text-text-muted">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
