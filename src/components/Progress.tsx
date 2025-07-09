"use client";

import { AppProgressProvider } from "@bprogress/next";
import { ReactNode } from "react";

export function ProgressProvider({ children }: { children: ReactNode }) {
  return (
    <AppProgressProvider
      height="5px"
      color="#fafafa"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </AppProgressProvider>
  );
}
