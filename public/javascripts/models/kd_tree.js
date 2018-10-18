import { medianIndex } from '../utilities/splitting.js'
import { squaredDistance } from '../utilities/distance.js'
import { flatten, sort } from '../utilities/index.js'

const sortNodes = (nodes, axis, locate) => {
  return sort(nodes, (node, neighbor) => {
    const nodeLocation = locate(node)[axis]
    const neighborLocation = locate(neighbor)[axis]

    if (nodeLocation === neighborLocation) return 0
    if (locate(node)[axis] < locate(neighbor)[axis]) return -1
    return 1
  })
}

class Node {
  constructor ({ element, locate, left, right, parent }) {
    this.parent = parent
    this.element = element
    this.locate = locate
    this.left = left
    this.right = right
  }

  nearest ({ to, distance = squaredDistance, depth = 0 }) {
    const branches = this._orderCandidateBranches({ to, depth })

    return branches.reduce((memo, branch) => {
      const best = memo.locate(memo.element)
      const candidate = branch.nearest({ to, distance, depth: depth + 1 })
      const nextBest = candidate.locate(candidate.element)

      return distance(to, best) > distance(to, nextBest) ? candidate : memo
    }, this)
  }

  _orderCandidateBranches ({ to, depth }) {
    const { left, right, element, locate } = this
    const location = locate(element)
    const k = location.length
    const axis = depth % k
    const branches = to[axis] < location[axis] ? [left, right] : [right, left]

    return branches.filter(branch => branch)
  }

  elementsOf (branch) {
    return branch ? branch.elements() : []
  }

  elements () {
    const { left, right } = this

    return flatten([this.element, this.elementsOf(left), this.elementsOf(right)])
  }

  childOf (node) {
    return this.parent && (this.parent === node || this.parent.childOf(node))
  }

  static from ({ nodes = [], locate, depth = 0, split = medianIndex, parent = null }) {
    if (!nodes || !nodes.length) return null

    const k = locate(nodes[0]).length // dimensionality
    const axis = depth % k
    const sorted = sortNodes(nodes, axis, locate)
    const medianIndex = split(nodes, node => locate(node)[axis])
    const node = new Node({ element: sorted[medianIndex], parent, locate })
    const leftBranch = sorted.slice(0, medianIndex)
    const rightBranch = sorted.slice(medianIndex + 1)

    node.left = Node.from({ nodes: leftBranch, depth: depth + 1, split, locate, parent: node })
    node.right = Node.from({ nodes: rightBranch, depth: depth + 1, split, locate, parent: node })

    return node
  }
}

export default Node
