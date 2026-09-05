"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

export type TreeKey = string | number

export interface TreeRenderContext<T> {
  node: T
  depth: number
  index: number
  siblingsCount: number
  hasChildren: boolean
  expandable: boolean
  expanded: boolean
  selected: boolean
  checked: boolean
  indeterminate: boolean
  disabled: boolean
  draggable: boolean
  loading: boolean
  toggle: () => void
  select: (event?: React.MouseEvent) => void
  check: (event?: React.ChangeEvent<HTMLInputElement>) => void
  path: TreeKey[]
  indentSize: number
  showLine: boolean
  icon: React.ReactNode
  switcherIcon: React.ReactNode
  blockNode: boolean
  checkbox: React.ReactNode
  dragProps: React.HTMLAttributes<HTMLElement>
}

export interface TreeLineConfig {
  showLeafIcon?: boolean
}

export interface TreeProps<T> {
  data: T[]
  getKey: (node: T) => TreeKey
  getChildren?: (node: T) => T[] | undefined
  renderNode: (context: TreeRenderContext<T>) => React.ReactNode
  renderIcon?: (context: Omit<TreeRenderContext<T>, "icon">) => React.ReactNode
  switcherIcon?: React.ReactNode | ((context: Omit<TreeRenderContext<T>, "icon" | "switcherIcon">) => React.ReactNode)
  className?: string
  style?: React.CSSProperties
  emptyState?: React.ReactNode
  defaultExpandedKeys?: TreeKey[]
  expandedKeys?: TreeKey[]
  onExpandedKeysChange?: (keys: TreeKey[]) => void
  defaultExpandAll?: boolean
  defaultExpandParent?: boolean
  autoExpandParent?: boolean
  showLine?: boolean | TreeLineConfig
  indentSize?: number
  blockNode?: boolean
  showIcon?: boolean
  selectable?: boolean
  multiple?: boolean
  checkable?: boolean
  checkStrictly?: boolean
  disabled?: boolean | ((node: T) => boolean)
  draggable?: boolean | ((node: T) => boolean)
  isLeaf?: (node: T) => boolean
  defaultSelectedKeys?: TreeKey[]
  selectedKeys?: TreeKey[]
  onSelect?: (selectedKeys: TreeKey[], info: { selected: boolean; key: TreeKey; node: T; selectedNodes: T[]; event?: React.MouseEvent }) => void
  defaultCheckedKeys?: TreeKey[]
  checkedKeys?: TreeKey[]
  onCheck?: (checkedKeys: TreeKey[], info: { checked: boolean; key: TreeKey; node: T; checkedNodes: T[]; event?: React.ChangeEvent<HTMLInputElement> }) => void
  loadData?: (node: T, path: TreeKey[]) => Promise<void> | void
}

const defaultGetChildren = <T,>(node: T) => ((node as { children?: T[] }).children)

function collectTreeKeys<T>(data: T[], getKey: (node: T) => TreeKey, getChildren: (node: T) => T[] | undefined): TreeKey[] {
  const keys: TreeKey[] = []

  const walk = (nodes: T[]) => {
    nodes.forEach((node) => {
      keys.push(getKey(node))
      const children = getChildren(node)
      if (children?.length) walk(children)
    })
  }

  walk(data)
  return keys
}

function buildParentMap<T>(
  data: T[],
  getKey: (node: T) => TreeKey,
  getChildren: (node: T) => T[] | undefined,
): Map<TreeKey, TreeKey | null> {
  const map = new Map<TreeKey, TreeKey | null>()

  const walk = (nodes: T[], parentKey: TreeKey | null) => {
    nodes.forEach((node) => {
      const key = getKey(node)
      map.set(key, parentKey)
      const children = getChildren(node)
      if (children?.length) walk(children, key)
    })
  }

  walk(data, null)
  return map
}

function expandParentKeys(keys: TreeKey[], parentMap: Map<TreeKey, TreeKey | null>): TreeKey[] {
  const next = new Set<TreeKey>(keys)

  keys.forEach((key) => {
    let parent = parentMap.get(key) ?? null
    while (parent !== null) {
      next.add(parent)
      parent = parentMap.get(parent) ?? null
    }
  })

  return Array.from(next)
}

function areTreeKeysEqual(a: TreeKey[], b: TreeKey[]) {
  if (a.length !== b.length) return false
  return a.every((item, index) => item === b[index])
}

export function Tree<T>({
  data,
  getKey,
  getChildren = defaultGetChildren,
  renderNode,
  renderIcon,
  switcherIcon,
  className,
  style,
  emptyState = null,
  defaultExpandedKeys = [],
  expandedKeys,
  onExpandedKeysChange,
  defaultExpandAll = false,
  defaultExpandParent = false,
  autoExpandParent,
  showLine = false,
  indentSize = 16,
  blockNode = false,
  showIcon = false,
  selectable = false,
  multiple = false,
  checkable = false,
  disabled = false,
  draggable = false,
  isLeaf,
  defaultSelectedKeys = [],
  selectedKeys,
  onSelect,
  defaultCheckedKeys = [],
  checkedKeys,
  onCheck,
  loadData,
}: TreeProps<T>) {
  const parentMap = useMemo(() => buildParentMap(data, getKey, getChildren), [data, getChildren, getKey])
  const autoExpandParentEnabled = autoExpandParent ?? defaultExpandParent
  const fallbackExpandedKeys = useMemo(
    () => {
      const keys = defaultExpandAll ? collectTreeKeys(data, getKey, getChildren) : defaultExpandedKeys
      return autoExpandParentEnabled ? expandParentKeys(keys, parentMap) : keys
    },
    [data, autoExpandParentEnabled, defaultExpandAll, defaultExpandedKeys, getChildren, getKey, parentMap],
  )

  const [uncontrolledExpandedKeys, setUncontrolledExpandedKeys] = useState<TreeKey[]>(fallbackExpandedKeys)
  const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = useState<TreeKey[]>(defaultSelectedKeys)
  const [uncontrolledCheckedKeys, setUncontrolledCheckedKeys] = useState<TreeKey[]>(defaultCheckedKeys)
  const [loadingKeys, setLoadingKeys] = useState<TreeKey[]>([])
  const initializedExpandedRef = useRef(false)

  useEffect(() => {
    if (expandedKeys === undefined && !initializedExpandedRef.current) {
      initializedExpandedRef.current = true
      setUncontrolledExpandedKeys(fallbackExpandedKeys)
    }
  }, [expandedKeys, fallbackExpandedKeys])

  useEffect(() => {
    if (selectedKeys === undefined) {
      setUncontrolledSelectedKeys((current) => (areTreeKeysEqual(current, defaultSelectedKeys) ? current : defaultSelectedKeys))
    }
  }, [defaultSelectedKeys, selectedKeys])

  useEffect(() => {
    if (checkedKeys === undefined) {
      setUncontrolledCheckedKeys((current) => (areTreeKeysEqual(current, defaultCheckedKeys) ? current : defaultCheckedKeys))
    }
  }, [checkedKeys, defaultCheckedKeys])

  const currentExpandedKeys = expandedKeys ?? uncontrolledExpandedKeys
  const normalizedExpandedKeys = useMemo(
    () => (autoExpandParentEnabled ? expandParentKeys(currentExpandedKeys, parentMap) : currentExpandedKeys),
    [autoExpandParentEnabled, currentExpandedKeys, parentMap],
  )
  const expandedSet = useMemo(() => new Set(normalizedExpandedKeys), [normalizedExpandedKeys])
  const currentSelectedKeys = selectedKeys ?? uncontrolledSelectedKeys
  const selectedSet = useMemo(() => new Set(currentSelectedKeys), [currentSelectedKeys])
  const currentCheckedKeys = checkedKeys ?? uncontrolledCheckedKeys
  const checkedSet = useMemo(() => new Set(currentCheckedKeys), [currentCheckedKeys])
  const normalizedCheckedKeys = useMemo(
    () => normalizeCheckedKeys(data, getKey, getChildren, checkedSet),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkedSet, data, getChildren, getKey],
  )
  const normalizedCheckedSet = useMemo(() => new Set(normalizedCheckedKeys), [normalizedCheckedKeys])
  const loadingSet = useMemo(() => new Set(loadingKeys), [loadingKeys])
  const showLineEnabled = Boolean(showLine)
  const resolvedSwitcherIcon = (context: Omit<TreeRenderContext<T>, "icon" | "switcherIcon">) => {
    if (typeof switcherIcon === "function") return switcherIcon(context)
    if (switcherIcon !== undefined) return switcherIcon
    return context.expanded ? "DownOutlined" : "RightOutlined"
  }

  const setExpandedKeys = (nextKeys: TreeKey[]) => {
    if (expandedKeys === undefined) {
      setUncontrolledExpandedKeys(nextKeys)
    }
    onExpandedKeysChange?.(nextKeys)
  }

  const setSelectedKeys = (nextKeys: TreeKey[], info: { selected: boolean; key: TreeKey; node: T; event?: React.MouseEvent }) => {
    if (selectedKeys === undefined) {
      setUncontrolledSelectedKeys(nextKeys)
    }
    const selectedNodes = nextKeys
      .map((nextKey) => {
        const stack: T[] = [...data]
        while (stack.length) {
          const current = stack.shift()!
          if (getKey(current) === nextKey) return current
          const children = getChildren(current)
          if (children?.length) stack.unshift(...children)
        }
        return null
      })
      .filter(Boolean) as T[]

    onSelect?.(nextKeys, { ...info, selectedNodes })
  }

  const setCheckedKeys = (
    nextKeys: TreeKey[],
    info: { checked: boolean; key: TreeKey; node: T; event: React.ChangeEvent<HTMLInputElement> },
  ) => {
    const normalized = normalizeCheckedKeys(data, getKey, getChildren, new Set(nextKeys))
    if (checkedKeys === undefined) {
      setUncontrolledCheckedKeys(normalized)
    }
    const checkedNodes = normalized
      .map((nextKey) => findNodeByKey(data, getKey, getChildren, nextKey))
      .filter(Boolean) as T[]
    onCheck?.(normalized, { ...info, checkedNodes })
  }

  const toggle = async (key: TreeKey, hasChildren: boolean, node: T, path: TreeKey[], expandable: boolean, loading: boolean) => {
    if (!expandable || loading) return

    const next = new Set(currentExpandedKeys)
    const isExpanded = next.has(key)
    if (isExpanded) {
      next.delete(key)
      setExpandedKeys(Array.from(next))
      return
    }

    const applyExpand = () => {
      next.add(key)
      setExpandedKeys(Array.from(next))
    }

    if (loadData && !hasChildren && !isLeaf?.(node)) {
      setLoadingKeys((current) => (current.includes(key) ? current : [...current, key]))
      try {
        await Promise.resolve(loadData(node, path))
        applyExpand()
      } finally {
        setLoadingKeys((current) => current.filter((item) => item !== key))
      }
      return
    }

    applyExpand()
  }

  function findNodeByKey(nodes: T[], getKeyFn: (node: T) => TreeKey, getChildrenFn: (node: T) => T[] | undefined, targetKey: TreeKey): T | null {
    const stack = [...nodes]
    while (stack.length) {
      const current = stack.shift()!
      if (getKeyFn(current) === targetKey) return current
      const children = getChildrenFn(current)
      if (children?.length) stack.unshift(...children)
    }
    return null
  }

  function collectSubtreeKeys(node: T, getKeyFn: (node: T) => TreeKey, getChildrenFn: (node: T) => T[] | undefined): TreeKey[] {
    const keys: TreeKey[] = []
    const walk = (current: T) => {
      keys.push(getKeyFn(current))
      const children = getChildrenFn(current) ?? []
      children.forEach(walk)
    }
    walk(node)
    return keys
  }

  function normalizeCheckedKeys(nodes: T[], getKeyFn: (node: T) => TreeKey, getChildrenFn: (node: T) => T[] | undefined, initialChecked: Set<TreeKey>): TreeKey[] {
    const result = new Set<TreeKey>()

    const walk = (node: T): boolean => {
      const key = getKeyFn(node)
      const children = getChildrenFn(node) ?? []

      if (!children.length) {
        const checked = initialChecked.has(key)
        if (checked) result.add(key)
        return checked
      }

      const childCheckedStates = children.map(walk)
      const allChecked = childCheckedStates.every(Boolean)

      if (allChecked) {
        result.add(key)
        return true
      }

      return false
    }

    nodes.forEach(walk)
    return Array.from(result)
  }

  function getCheckState(node: T): { checked: boolean; indeterminate: boolean } {
    const children = getChildren(node) ?? []
    const key = getKey(node)

    if (!children.length) {
      const checked = normalizedCheckedSet.has(key)
      return { checked, indeterminate: false }
    }

    const childStates = children.map((child) => getCheckState(child))
    const allChecked = childStates.every((state) => state.checked)
    const someChecked = childStates.some((state) => state.checked || state.indeterminate)

    return {
      checked: allChecked,
      indeterminate: !allChecked && someChecked,
    }
  }

  const resolveBooleanProp = (value: boolean | ((node: T) => boolean), node: T) =>
    typeof value === "function" ? value(node) : value

  const renderNodes = (nodes: T[], depth: number, path: TreeKey[]) =>
    nodes.map((node, index) => {
      const key = getKey(node)
      const children = getChildren(node) ?? []
      const hasChildren = children.length > 0
      const expanded = expandedSet.has(key)
      const selected = selectedSet.has(key)
      const isDisabled = resolveBooleanProp(disabled, node)
      const isDraggable = resolveBooleanProp(draggable, node) && !isDisabled
      const checkState = getCheckState(node)
      const loading = loadingSet.has(key)
      const expandable = hasChildren || Boolean(loadData && !isLeaf?.(node))
      const nextPath = [...path, key]
      const context = {
        node,
        depth,
        index,
        siblingsCount: nodes.length,
        hasChildren,
        expandable,
        expanded,
        selected,
        checked: checkState.checked,
        indeterminate: checkState.indeterminate,
        disabled: isDisabled,
        draggable: isDraggable,
        loading,
        toggle: () => {
          if (isDisabled) return
          void toggle(key, hasChildren, node, nextPath, expandable, loading)
        },
        select: (event?: React.MouseEvent) => {
          if (!selectable || isDisabled) return
          const isSelected = selectedSet.has(key)
          const nextKeys = multiple
            ? isSelected
              ? currentSelectedKeys.filter((item) => item !== key)
              : [...currentSelectedKeys, key]
            : [key]
          setSelectedKeys(nextKeys, { selected: !isSelected, key, node, event })
        },
        check: (event?: React.ChangeEvent<HTMLInputElement>) => {
          if (!checkable || isDisabled) return
          const isChecked = checkState.checked || checkState.indeterminate
          const subtreeKeys = collectSubtreeKeys(node, getKey, getChildren)
          const nextChecked = new Set(currentCheckedKeys)

          subtreeKeys.forEach((subKey) => {
            if (event?.target.checked ?? !isChecked) {
              nextChecked.add(subKey)
            } else {
              nextChecked.delete(subKey)
            }
          })

          if (event) {
            setCheckedKeys(Array.from(nextChecked), { checked: event.target.checked, key, node, event })
          }
        },
        path: nextPath,
        indentSize,
        showLine: showLineEnabled,
        icon: null,
        switcherIcon: null,
        blockNode,
        checkbox: checkable ? (
          <input
            type="checkbox"
            checked={checkState.checked}
            ref={(element) => {
              if (element) {
                element.indeterminate = checkState.indeterminate
              }
            }}
            disabled={isDisabled}
            onChange={(event) => {
              const subtreeKeys = collectSubtreeKeys(node, getKey, getChildren)
              const nextChecked = new Set(currentCheckedKeys)

              subtreeKeys.forEach((subKey) => {
                if (event.target.checked) {
                  nextChecked.add(subKey)
                } else {
                  nextChecked.delete(subKey)
                }
              })

              setCheckedKeys(Array.from(nextChecked), { checked: event.target.checked, key, node, event })
            }}
            onClick={(event) => event.stopPropagation()}
          />
        ) : null,
        dragProps: isDraggable
          ? {
              draggable: true,
              onDragStart: (event: React.DragEvent<HTMLElement>) => {
                event.dataTransfer.setData("text/plain", String(key))
                event.dataTransfer.effectAllowed = "move"
              },
            }
          : {},
      }
      const icon = showIcon ? renderIcon?.(context) ?? null : null
      const resolvedIcon = resolvedSwitcherIcon(context)

      return (
        <React.Fragment key={String(key)}>
          <div style={{ position: "relative" }}>
            {showLineEnabled && depth > 0 ? (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: Math.max(depth - 1, 0) * indentSize + indentSize / 2,
                  top: 0,
                  bottom: 0,
                  width: 1,
                  background: "#EBF1FF",
                }}
              />
            ) : null}
            <div style={{ width: blockNode ? "100%" : undefined }}>
              {renderNode({ ...context, icon, switcherIcon: resolvedIcon })}
            </div>
            {hasChildren && expanded ? renderNodes(children, depth + 1, nextPath) : null}
          </div>
        </React.Fragment>
      )
    })

  if (!data.length) {
    return <>{emptyState}</>
  }

  return (
    <div className={className} style={style}>
      {renderNodes(data, 0, [])}
    </div>
  )
}

export default Tree
