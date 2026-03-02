import Link from "next/link";
import { ROUTES } from "@shared/routes";

export default function EndpointNotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-5 text-center px-6">
      <div className="w-14 h-14 rounded-xl bg-red-500/15 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-red-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Not found</title>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35M11 8v3M11 14h.01" />
        </svg>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
          404
        </span>
        <h2 className="text-base font-semibold text-white/90">
          Endpoint not found
        </h2>
        <p className="text-sm text-text-muted max-w-xs">
          This endpoint does not exist or may have been deleted.
        </p>
      </div>

      <Link
        href={ROUTES.ENDPOINTS.CREATE}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-dashed border-border text-sm font-medium text-text-muted hover:border-accent hover:text-accent transition-colors duration-150"
      >
        <span>+</span>
        <span>Create a new endpoint</span>
      </Link>
    </div>
  );
}
