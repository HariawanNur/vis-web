declare global {
  interface Window {
    __ENV__?: {
      NEXT_PUBLIC_API_URL?: string;
    };
  }
}

export const getRuntimeEnv = () => {
  if (typeof window === "undefined") {
    return {};
  }

  return window.__ENV__ ?? {};
};

export const getApiUrl = () => {
  return getRuntimeEnv().NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";
};
