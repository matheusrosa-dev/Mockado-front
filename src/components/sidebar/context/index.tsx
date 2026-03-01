"use client";

import { createContext, useContext, useState } from "react";

type Context = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Context = createContext({} as Context);

type Props = {
  children: React.ReactNode;
};

export function Provider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useSidebarContext() {
  return useContext(Context);
}
