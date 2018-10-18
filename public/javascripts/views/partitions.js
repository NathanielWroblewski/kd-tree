import { HEIGHT, WIDTH, PARTICLE_RADIUS, TAU } from '../constants/index.js'

const renderPartition = ({ element, source, destination, color = '#ccccc6' }) => {
  const context = element.getContext('2d')

  context.strokeStyle = color
  context.lineWidth = 2
  context.beginPath()
  context.moveTo(source.x, source.y)
  context.lineTo(destination.x, destination.y)
  context.stroke()
}

const renderPoint = ({ element, x, y, radius = PARTICLE_RADIUS, color = '#ccccc6' }) => {
  const context = element.getContext('2d')

  context.fillStyle = color
  context.beginPath()
  context.arc(x, y, radius, 0, TAU)
  context.fill()
}

const renderTree = ({ element, tree, depth = 0, minX = 0, maxX = WIDTH, minY = 0, maxY = HEIGHT, maxDepth = 1 }) => {
  if (!tree || depth === maxDepth) return

  const context = element.getContext('2d')
  const location = tree.locate(tree.element)
  const [x, y] = location
  const isHorizontal = depth % location.length === 1
  const color = depth === maxDepth - 1 ? '#444' : '#ccccc6'
  const shared = { element, depth: depth + 1, minX, maxX, minY, maxY, maxDepth }

  const source = isHorizontal ? { x: minX, y } : { x, y: minY }
  const destination = isHorizontal ? { x: maxX, y } : { x, y: maxY }
  const right = isHorizontal ? { minY: y } : { minX: x }
  const left = isHorizontal ? { maxY: y } : { maxX: x }

  renderPartition({ element, source, destination, color })
  renderPoint({ element, x, y, color })
  renderTree({ ...shared, tree: tree.right, ...right })
  renderTree({ ...shared, tree: tree.left, ...left })
}

export default renderTree
