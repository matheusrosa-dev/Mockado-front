import { LuTriangleAlert } from "react-icons/lu";
import { PrivateContent } from "../private-content";
import { PrivateHeader } from "../private-header";

export function NotFound() {
  return (
    <>
      <PrivateHeader>NOT FOUND</PrivateHeader>

      <PrivateContent>
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-error/30 bg-error/10 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error/10">
            <LuTriangleAlert className="text-error text-2xl" />
          </div>
          <div>
            <p className="text-sm font-medium text-error">NOT FOUND</p>
            <p className="mt-1 text-xs text-text-muted">
              This resource does not exist or has been removed. Please check the
              URL and try again.
            </p>
          </div>
        </div>
      </PrivateContent>
    </>
  );
}
