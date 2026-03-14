import { PrivateHeader } from "@components";
import { useSessionStore } from "@shared/stores";
import { createFileRoute, Link } from "@tanstack/react-router";
import { IoArrowForward } from "react-icons/io5";

export const Route = createFileRoute("/(private)/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = useSessionStore();
  return (
    <>
      <PrivateHeader>Welcome, {session?.user?.name}!</PrivateHeader>

      <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center px-6">
        <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
          <IoArrowForward className="w-6 h-6 text-accent" />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-white/90">
            Select or create an endpoint
          </h2>

          <p className="text-sm text-text-muted max-w-xs">
            Choose an endpoint from the sidebar or create a new one to start
            mocking your API responses.
          </p>

          <Link
            to="/endpoints/create"
            className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-md border border-dashed border-border text-sm 
            font-medium text-text-muted cursor-pointer hover:border-accent hover:text-accent duration-150 mt-1"
          >
            <span>+</span>
            <span>Create endpoint</span>
          </Link>
        </div>
      </div>
    </>
  );
}
