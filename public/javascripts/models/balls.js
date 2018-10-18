import Vector from './vector.js'
import Particle from './particle.js'
import KDTree from './kd_tree.js'
import { BALL_COUNT, BALL_RADIUS } from '../constants/index.js'

class Balls {
  constructor ({ items }) {
    this.items = items || new Array(BALL_COUNT).fill(0).map(() => (
      new Particle({ radius: BALL_RADIUS })
    ))
  }

  map (fn) {
    return this.items.map(fn)
  }

  forEach (fn) {
    return this.items.forEach(fn)
  }

  toJSON () {
    return this.items.map(item => item.toJSON())
  }
}

export default Balls
