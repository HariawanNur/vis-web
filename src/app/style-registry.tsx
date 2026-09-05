"use client";

import { createCache } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { StyleProvider, extractStaticStyle } from "antd-style";

const cache = createCache();
extractStaticStyle.cache = cache;

export function StyleRegistry({ children }: { children: ReactNode }) {
  useServerInsertedHTML(() => (
    <>
      {extractStaticStyle().map((item) => (
        <Fragment key={item.key}>{item.style}</Fragment>
      ))}
    </>
  ));

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
