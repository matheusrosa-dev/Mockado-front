import { useSidebarContext } from "../../context";

export function Wrapper({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useSidebarContext();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/50 z-20 lg:hidden w-full h-full cursor-default"
          onClick={close}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`
          fixed lg:relative z-30 h-full
          min-w-64 w-64 flex flex-col bg-background-secondary border-r border-border
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {children}
      </aside>
    </>
  );
}
