"use client";

import { useEffect, useState, type ReactNode } from "react";
import { App as AntApp, ConfigProvider } from "antd";
import { BootstrapLoader } from "@/components";
import { I18nProvider } from "@/i18n";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider, useThemeMode } from "@/context/theme-context";
import { antdTheme, darkAntdTheme } from "@/theme/antd-theme";

const mswEnabled = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_ENABLE_MSW !== "false";

function createRequestId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `req-${Date.now().toString(36)}`;
}

function BootstrapGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [requestId, setRequestId] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    if (!mswEnabled) {
      setReady(true);
      return () => {
        active = false;
      };
    }

    setReady(false);
    const slowTimer = window.setTimeout(() => {
      if (active) setSlow(true);
    }, 6000);

    setSlow(false);
    setError(null);
    setRequestId("");

    import("@/mocks/browser")
      .then(({ startMockWorker }) => startMockWorker())
      .then(() => {
        if (active) setReady(true);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setError(reason instanceof Error ? reason : new Error(String(reason)));
        setRequestId(createRequestId());
      });

    return () => {
      active = false;
      window.clearTimeout(slowTimer);
    };
  }, [attempt]);

  if (!ready) {
    return (
      <BootstrapLoader
        activeStep={0}
        slow={slow}
        error={error}
        requestId={requestId}
        onRetry={() => setAttempt((value) => value + 1)}
      />
    );
  }

  return children;
}

function ThemedApp({ children }: { children: ReactNode }) {
  const { isDark } = useThemeMode();

  return (
    <ConfigProvider theme={isDark ? darkAntdTheme : antdTheme}>
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ThemedApp>
        <I18nProvider>
          <AuthProvider>
            <BootstrapGate>{children}</BootstrapGate>
          </AuthProvider>
        </I18nProvider>
      </ThemedApp>
    </ThemeProvider>
  );
}
