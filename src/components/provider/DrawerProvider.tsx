"use client";

import React, { createContext, useContext, useState } from "react";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DrawerCtx = createContext<Ctx | null>(null);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <DrawerCtx.Provider value={{ open, setOpen }}>
      {children}
    </DrawerCtx.Provider>
  );
};

export const useDrawer = () => {
  const ctx = useContext(DrawerCtx);
  if (!ctx) throw new Error("useDrawer must be used within DrawerProvider");
  return ctx;
};
