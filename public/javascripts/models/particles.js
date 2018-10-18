import Vector from './vector.js'
import Particle from './particle.js'
import KDTree from './kd_tree.js'
import { PARTICLE_COUNT } from '../constants/index.js'

const locate = (element) => {
  const { x, y } = element.toJSON()

  return [x, y]
}

class Particles {
  constructor ({ items }) {
    const nodes = items || Particles.generate(PARTICLE_COUNT)

    this.tree = KDTree.from({ nodes, locate })
  }

  nearest ({ to, returnNode = false }) {
    const node = this.tree.nearest({ to })

    return returnNode ? node : node.element
  }

  elements () {
    return this.tree.elements()
  }

  toJSON () {
    return this.tree.elements().map(element => element.toJSON())
  }

  static generate (count) {
    const velocity = new Vector({ x: 0, y: 0 })

    return Array.from(Array(count), () => new Particle({ velocity }))
  }
}

export default Particles
