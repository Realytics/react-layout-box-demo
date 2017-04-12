
const directionPropsMapper = {
  vertical: 'height',
  horizontal: 'width'
}

export function percent(percentage, fallback = 100) {
  return (layout, direction) => {
    const size = layout[directionPropsMapper[direction]]
    return (size.valid ? (size.value * (percentage / 100)) : fallback)
  }
}

export function display(layout) {
  const width = layout.width.valid ? layout.width.value : 'INVALID'
  const height = layout.height.valid ? layout.height.value : 'INVALID'
  return `${width} x ${height}`
}