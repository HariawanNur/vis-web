const hslToHex = (h: number, s: number, l: number) => {
  const saturation = s / 100
  const lightness = l / 100
  const c = (1 - Math.abs(2 * lightness - 1)) * saturation
  const hp = h / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))

  let r = 0
  let g = 0
  let b = 0

  if (hp >= 0 && hp < 1) {
    r = c
    g = x
  } else if (hp >= 1 && hp < 2) {
    r = x
    g = c
  } else if (hp >= 2 && hp < 3) {
    g = c
    b = x
  } else if (hp >= 3 && hp < 4) {
    g = x
    b = c
  } else if (hp >= 4 && hp < 5) {
    r = x
    b = c
  } else {
    r = c
    b = x
  }

  const m = lightness - c / 2
  const toHex = (value: number) => Math.round((value + m) * 255).toString(16).padStart(2, "0")

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

export const generateHexColor = () => {
  const hue = Math.floor(Math.random() * 360)
  const saturation = 68 + Math.floor(Math.random() * 18)
  const lightness = 42 + Math.floor(Math.random() * 14)
  return hslToHex(hue, saturation, lightness)
}

export const generateUniqueHexColor = (used: Set<string>) => {
  let attempts = 0

  while (attempts < 32) {
    const color = generateHexColor()
    if (!used.has(color)) {
      used.add(color)
      return color
    }
    attempts += 1
  }

  const fallback = "#64748B"
  used.add(fallback)
  return fallback
}

const stringHash = (input: string) => {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }
  return hash
}

export const generateStableHexColor = (seed: string) => {
  const hash = stringHash(seed)
  const hue = hash % 360
  const saturation = 60 + (hash % 18)
  const lightness = 40 + ((hash >> 8) % 16)
  return hslToHex(hue, saturation, lightness)
}

export const hexToRgba = (hex: string, alpha: number) => {
  const clean = hex.replace("#", "")
  const value = clean.length === 3
    ? clean.split("").map((char) => char + char).join("")
    : clean
  const int = Number.parseInt(value, 16)
  const r = (int >> 16) & 255
  const g = (int >> 8) & 255
  const b = int & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
