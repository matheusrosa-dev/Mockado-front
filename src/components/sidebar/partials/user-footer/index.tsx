import { useLogout } from "@services/auth/react-query";
import { useSessionStore } from "@shared/stores";
import { LuLogOut } from "react-icons/lu";

export function UserFooter() {
  const { session, destroySession } = useSessionStore();
  const { logout } = useLogout({
    onMutate: destroySession,
  });

  if (!session) return null;

  const initials = session.user.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <section className="border-t border-border p-3 flex items-center gap-3 select-none">
      <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0">
        <span className="text-xs font-semibold text-accent">{initials}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white/90 truncate leading-none mb-0.5">
          {session.user.name}
        </p>
        <p className="text-xs text-text-muted truncate">{session.user.email}</p>
      </div>

      <button
        type="button"
        className="shrink-0 p-1.5 rounded-md text-text-subtle hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
        aria-label="Sign out"
        onClick={() => logout()}
      >
        <LuLogOut className="w-4 h-4" />
      </button>
    </section>
  );
}
