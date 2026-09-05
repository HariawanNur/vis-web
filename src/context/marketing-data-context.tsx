"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type MarketingDataSource = "api" | "fallback";

interface MarketingDataStatusValue {
  source: MarketingDataSource;
  setSource: (source: MarketingDataSource) => void;
}

const MarketingDataStatusContext = createContext<MarketingDataStatusValue | undefined>(undefined);

export function MarketingDataStatusProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<MarketingDataSource>("api");

  const value = useMemo(
    () => ({ source, setSource }),
    [source],
  );

  return (
    <MarketingDataStatusContext.Provider value={value}>
      {children}
    </MarketingDataStatusContext.Provider>
  );
}

export function useMarketingDataStatus() {
  const ctx = useContext(MarketingDataStatusContext);
  if (!ctx) {
    throw new Error("useMarketingDataStatus must be used within MarketingDataStatusProvider");
  }
  return ctx;
}
