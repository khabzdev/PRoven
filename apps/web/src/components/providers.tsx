import React from "react";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster position="bottom-right" />
    </React.Fragment>
  );
};
