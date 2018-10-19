import { HEIGHT, WIDTH, TAU, NODE_RADIUS } from '../constants/index.js'

const MIN_X = NODE_RADIUS
const MAX_X = WIDTH - NODE_RADIUS

const renderEdge = ({ element, source, destination, color = '#666' }) => {
  const context = element.getContext('2d')

  if (source && destination) {
    context.strokeStyle = color
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(source.x, source.y)
    context.lineTo(destination.x, destination.y)
    context.stroke()
  }
}

const renderNode = ({ element, x, y, color = '#666' }) => {
  const context = element.getContext('2d')

  context.fillStyle = color
  context.beginPath()
  context.arc(x, y, NODE_RADIUS, 0, TAU)
  context.fill()
}

const renderTraversal = ({ element, tree, nearest, depth = 0, minX = MIN_X, maxX = MAX_X, parentPosition, color = '#666' }) => {
  if (!tree) return

  const context = element.getContext('2d')
  const x = Math.floor(((maxX - minX) / 2) + minX)
  const y = Math.floor((HEIGHT / 8) * (depth + 1))
  const shared = {
    element, depth: depth + 1, parentPosition: { x, y }, nearest, color,
  };

  if (nearest.childOf(tree) || nearest === tree) {
    renderEdge({ element, source: { x, y }, destination: parentPosition, color })
    renderNode({ element, x, y, color })
  }

  renderTraversal({ ...shared, tree: tree.right, minX: x, maxX })
  renderTraversal({ ...shared, tree: tree.left, minX, maxX: x })
}

export default renderTraversal
