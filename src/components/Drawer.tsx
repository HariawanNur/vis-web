import React from "react"
import { Drawer as AntDrawer, DrawerProps as AntDrawerProps } from "antd"

export interface CustomDrawerProps extends Omit<AntDrawerProps, "width"> {
  width?: number | string
}

export const Drawer: React.FC<CustomDrawerProps> = ({ width, styles, ...props }) => {
  const normalizeStyles = React.useCallback(
    (input: NonNullable<typeof styles> | undefined) => {
      if (!input) return input

      if (typeof input === "function") {
        return (info: Parameters<NonNullable<typeof input>>[0]) => {
          const resolved = input(info) ?? {}
          const section = (resolved as { section?: React.CSSProperties }).section
          const content = (resolved as { content?: React.CSSProperties }).content

          return {
            section: {
              ...section,
              ...content,
            },
          }
        }
      }

      const section = (input as { section?: React.CSSProperties }).section
      const content = (input as { content?: React.CSSProperties }).content

      return {
        section: {
          ...section,
          ...content,
        },
      }
    },
    [],
  )

  const mergedStyles = React.useMemo(() => {
    const normalized = normalizeStyles(styles)

    if (!width) return normalized

    if (typeof normalized === "function") {
      return (info: Parameters<NonNullable<typeof normalized>>[0]) => {
        const resolved = normalized(info) ?? {}
        return {
          ...resolved,
          section: {
            ...(resolved as { section?: React.CSSProperties }).section,
            width,
          },
        }
      }
    }

    return {
      ...normalized,
      section: {
        ...((normalized as { section?: React.CSSProperties } | undefined)?.section),
        width,
      },
    }
  }, [normalizeStyles, styles, width])

  return <AntDrawer {...props} styles={mergedStyles as AntDrawerProps["styles"]} />
}
export default Drawer
