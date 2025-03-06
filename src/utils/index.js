// 将hex颜色转成rgb  例如(#F55442, 1)
export function hexToRgba(
  hex,
  opacity
) {
  // 移除可能存在的 # 前缀并转换为大写
  hex = hex.replace(/^#/, '').toUpperCase()

  // 如果是缩写形式（如 FFF），转换为完整形式
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char.repeat(2))
      .join('')
  }

  // 验证 hex 格式
  if (!/^[0-9A-F]{6}$/.test(hex)) {
    throw new Error('Invalid hex color format')
  }

  // 解析 RGB 值
  const [red, green, blue] = hex.match(/\w\w/g).map((x) => parseInt(x, 16))

  // 确保 opacity 在有效范围内
  opacity = Math.max(0, Math.min(1, opacity))

  // 构建 RGBA 字符串
  const rgba = `rgba(${red}, ${green}, ${blue}, ${opacity.toFixed(2)})`

  return { red, green, blue, rgba }
}
// 将rgb颜色转成hex  例如(24,12,255)
export function rgbToHex(r, g, b) {
  const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  return hex
}
// hex颜色转rgb颜色
export function hexToRgb(str) {
  str = str.replace('#', '')
  const hexs = str.match(/../g)
  if (!hexs) {
    throw new Error('Invalid hex color')
  }
  return hexs.map((hex) => parseInt(hex, 16))
}

// 颜色混合
export function colourBlend(c1, c2, ratio) {
  ratio = Math.max(Math.min(Number(ratio), 1), 0)
  const r1 = parseInt(c1.substring(1, 3), 16)
  const g1 = parseInt(c1.substring(3, 5), 16)
  const b1 = parseInt(c1.substring(5, 7), 16)
  const r2 = parseInt(c2.substring(1, 3), 16)
  const g2 = parseInt(c2.substring(3, 5), 16)
  const b2 = parseInt(c2.substring(5, 7), 16)
  let r = Math.round(r1 * (1 - ratio) + r2 * ratio)
  let g = Math.round(g1 * (1 - ratio) + g2 * ratio)
  let b = Math.round(b1 * (1 - ratio) + b2 * ratio)
  r = ('0' + (r || 0).toString(16)).slice(-2)
  g = ('0' + (g || 0).toString(16)).slice(-2)
  b = ('0' + (b || 0).toString(16)).slice(-2)
  return '#' + r + g + b
}
// 变浅颜色值
export function getLightColor(color, level, isDark = false) {
  if (isDark) {
    return getDarkColor(color, level)
  } else {
    const rgb = hexToRgb(color)
    const newRgb = rgb.map((value) => Math.floor((255 - value) * level + value))
    return rgbToHex(newRgb[0], newRgb[1], newRgb[2])
  }
}
// 变深颜色值
export function getDarkColor(color, level) {
  const rgb = hexToRgb(color)
  const newRgb = rgb.map((value) => Math.floor(value * (1 - level)))
  return rgbToHex(newRgb[0], newRgb[1], newRgb[2])
}

// 处理 Element Plus 主题颜色
export function handleElementThemeColor(theme, isDark = false) {
  console.log("🚀 ~ index.js:39 ~ handleElementThemeColor ~ document.documentElement:", document.documentElement.style)
  const elStyle = document.documentElement.style
  elStyle.setProperty('--el-color-primary', theme)
  for (let i = 1; i <= 9; i++) {
    elStyle.setProperty(
      `--el-color-primary-light-${i}`,
      `${getLightColor(theme, i / 10, isDark)}`
    )
  }
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-dark-${i}`,
      `${getDarkColor(theme, i / 10)}`
    )
  }
}
