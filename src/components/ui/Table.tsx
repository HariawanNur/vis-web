import React from "react"
import { Table as AntTable, TableProps as AntTableProps } from "antd"
import { createStyles } from "antd-style"
import classNames from "classnames"
import { designSystem } from "@/theme/antd-theme"
import { Button } from "./Button"
import { Flex } from "./Flex"
import { Icon } from "./Icon"
import { Select } from "./Select"
import { Typography } from "./Typography"

const { Text } = Typography

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50]
const { palette, radius, elevation } = designSystem

export interface CustomTablePaginationConfig {
  defaultCurrent?: number
  itemLabel?: string
}

export interface RowSpanMap {
  [rowKey: string]: { [colKey: string]: number }
}

export interface CustomTableProps<T extends object = any>
  extends Omit<AntTableProps<T>, "pagination"> {
  className?: string
  headerTitle?: React.ReactNode
  headerExtra?: React.ReactNode
  header?: React.ReactNode
  pagination?: false | CustomTablePaginationConfig
  computeRowSpan?: (pagedData: T[], getRowKey: (row: T) => string) => RowSpanMap
}

const useStyles = createStyles(({ css }) => ({
  shell: css`
    width: 100%;
    max-width: 100%;
    background: ${palette.white};
    border: 1px solid ${palette.track};
    border-radius: ${radius.xl}px;
    overflow: hidden;
    box-shadow: ${elevation.card};
  `,
  header: css`
    padding: 16px;
    border-bottom: 1px solid ${palette.track};
    background: ${palette.white};
  `,
  footer: css`
    padding: 16px;
    border-top: 1px solid ${palette.track};
    background: ${palette.white};
  `,
  paginationSelect: css`
    min-width: 136px !important;

    .ant-select-selector {
      height: 40px !important;
      border-radius: ${radius.lg}px !important;
      border-color: ${palette.border} !important;
      box-shadow: none !important;
      padding-left: 12px !important;
      padding-right: 12px !important;
    }

    .ant-select-selection-item {
      color: ${palette.text} !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      line-height: 40px !important;
    }

    .ant-select-arrow {
      color: ${palette.textTertiary} !important;
    }
  `,
  table: css`
    width: 100%;
    max-width: 100%;

    .ant-table {
      background: ${palette.white};
      width: 100% !important;
      max-width: 100% !important;
      table-layout: fixed;
    }

    .ant-table-container {
      border: none;
      border-radius: 0;
      overflow: visible;
    }

    .ant-table-thead > tr > th {
      background: ${palette.surface} !important;
      color: ${palette.textSecondary} !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      padding: 12px 16px !important;
      border-bottom: 1px solid ${palette.track} !important;
      white-space: nowrap;
    }

    .ant-table-tbody > tr > td {
      color: ${palette.text};
      font-size: 12px;
      font-weight: 600;
      border-bottom: 1px solid ${palette.track} !important;
      vertical-align: middle;
    }

    .ant-table-tbody > tr:last-child > td {
      border-bottom: none !important;
    }

    .ant-table-tbody > tr:hover > td {
      background: ${palette.surface} !important;
    }

    .ant-table-cell-row-hover {
      background: ${palette.surface} !important;
    }

    .ant-table-placeholder {
      border-bottom: none;
    }
  `,
}))

export const Table = <T extends object = any>(props: CustomTableProps<T>) => {
  const { styles } = useStyles()
  const {
    className,
    header,
    headerTitle,
    headerExtra,
    pagination,
    dataSource = [],
    computeRowSpan,
    columns,
    rowKey: rowKeyProp,
    ...rest
  } = props

  const customPagination = pagination !== false && pagination !== undefined ? pagination : false
  const enabledPagination = customPagination !== false
  const pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS
  const itemLabel = customPagination !== false ? customPagination.itemLabel ?? "item" : "item"

  const [current, setCurrent] = React.useState(customPagination !== false ? customPagination.defaultCurrent ?? 1 : 1)
  const [selectedPageSize, setSelectedPageSize] = React.useState(pageSizeOptions[0])

  const total = dataSource.length
  const totalPages = enabledPagination ? Math.max(Math.ceil(total / selectedPageSize), 1) : 1
  const safeCurrent = enabledPagination ? Math.min(current, totalPages) : 1
  const pagedData = enabledPagination
    ? dataSource.slice((safeCurrent - 1) * selectedPageSize, safeCurrent * selectedPageSize)
    : dataSource

  const getRowKey = React.useCallback(
    (row: T): string => {
      if (typeof rowKeyProp === "function") return String(rowKeyProp(row))
      return String((row as any)[rowKeyProp ?? "key"])
    },
    [rowKeyProp],
  )

  const rowSpanMap = React.useMemo<RowSpanMap | null>(() => {
    if (!computeRowSpan) return null
    return computeRowSpan([...pagedData], getRowKey)
  }, [computeRowSpan, pagedData, getRowKey])

  const mergedColumns = React.useMemo(() => {
    if (!rowSpanMap || !columns) return columns
    return (columns as any[]).map((col) => {
      if (!col.dataIndex) return col
      const colKey = col.key ?? col.dataIndex
      return {
        ...col,
        onCell: (record: any, index?: number) => {
          const span = rowSpanMap[getRowKey(record)]?.[colKey]
          const base = typeof col.onCell === "function" ? col.onCell(record, index) ?? {} : {}
          return { ...base, rowSpan: span ?? base.rowSpan ?? 1 }
        },
      }
    })
  }, [columns, rowSpanMap, getRowKey])

  const startRow = total === 0 ? 0 : (safeCurrent - 1) * selectedPageSize + 1
  const endRow = total === 0 ? 0 : Math.min(safeCurrent * selectedPageSize, total)

  const pageItems = React.useMemo<(number | "ellipsis")[]>(() => {
    if (!enabledPagination) return []
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const items: (number | "ellipsis")[] = [1]
    const start = Math.max(2, safeCurrent - 1)
    const end = Math.min(totalPages - 1, safeCurrent + 1)

    if (start > 2) items.push("ellipsis")

    for (let page = start; page <= end; page += 1) {
      items.push(page)
    }

    if (end < totalPages - 1) items.push("ellipsis")

    items.push(totalPages)
    return items
  }, [enabledPagination, totalPages, safeCurrent])

  const showHeader = Boolean(header || headerTitle || headerExtra)

  const enrichedData = React.useMemo(() => {
    if (!rowSpanMap) return pagedData
    return pagedData.map((row) => {
      const spans = rowSpanMap[getRowKey(row)]
      if (!spans) return row
      return { ...row, _rowSpan: spans }
    })
  }, [pagedData, rowSpanMap, getRowKey])

  const table = (
    <AntTable
      className={classNames(styles.table, className)}
      dataSource={enrichedData as T[]}
      columns={mergedColumns as any}
      rowKey={rowKeyProp as any}
      pagination={false}
      {...rest}
    />
  )

  return (
    <div className={styles.shell}>
      {showHeader && (
        <div className={styles.header}>
          {header ?? (
            <Flex align="center" justify="space-between" gap={16} wrap>
              <div>{headerTitle}</div>
              <div>{headerExtra}</div>
            </Flex>
          )}
        </div>
      )}

      {table}

      {enabledPagination && (
        <div className={styles.footer}>
            <Flex align="center" justify="space-between" gap={16} wrap>
            <Text style={{ fontSize: 12, color: palette.textSecondary, fontWeight: 600 }}>
              Menampilkan {startRow} - {endRow} dari {total} {itemLabel}
            </Text>

            <Flex align="center" gap={8} wrap>
              <Button
                type="text"
                disabled={safeCurrent <= 1}
                onClick={() => setCurrent((value) => Math.max(value - 1, 1))}
                style={{
                  width: 40,
                  height: 40,
                  padding: 0,
                  borderRadius: 10,
                  border: "1px solid transparent",
                  background: palette.white,
                  color: palette.textTertiary,
                  opacity: 1,
                }}
              >
                <Icon type="LeftOutlined" style={{ color: palette.textTertiary }} />
              </Button>

              {pageItems.map((item, index) => {
                if (item === "ellipsis") {
                  return (
                    <span key={`ellipsis-${index}`} style={{ color: palette.textTertiary, fontSize: 18, lineHeight: 1, padding: "0 4px" }}>
                      ...
                    </span>
                  )
                }

                const active = item === safeCurrent
                return (
                  <Button
                    key={item}
                    type="text"
                    disabled={totalPages <= 1}
                    onClick={() => setCurrent(item)}
                    style={{
                      minWidth: 40,
                      height: 40,
                      padding: "0 10px",
                      borderRadius: 10,
                      border: active ? `1px solid ${palette.primary}` : "1px solid transparent",
                      background: palette.white,
                      color: active ? palette.primary : palette.text,
                      fontSize: 14,
                      fontWeight: active ? 600 : 500,
                      boxShadow: active ? elevation.card : "none",
                    }}
                  >
                    {item}
                  </Button>
                )
              })}

              <Button
                type="text"
                disabled={safeCurrent >= totalPages}
                onClick={() => setCurrent((value) => Math.min(value + 1, totalPages))}
                style={{
                  width: 40,
                  height: 40,
                  padding: 0,
                  borderRadius: 10,
                  border: "1px solid transparent",
                  background: palette.white,
                  color: palette.textSecondary,
                  opacity: 1,
                }}
              >
                <Icon type="RightOutlined" style={{ color: palette.textSecondary }} />
              </Button>

              {pageSizeOptions.length > 1 ? (
                <Select
                  value={selectedPageSize}
                  onChange={(value) => {
                    setSelectedPageSize(Number(value))
                    setCurrent(1)
                  }}
                  className={styles.paginationSelect}
                  style={{ width: 136 }}
                  options={pageSizeOptions.map((value) => ({ value, label: `${value} / page` }))}
                />
              ) : null}
            </Flex>
          </Flex>
        </div>
      )}
    </div>
  )
}

Table.Column = AntTable.Column
Table.ColumnGroup = AntTable.ColumnGroup
Table.Summary = AntTable.Summary

export default Table
