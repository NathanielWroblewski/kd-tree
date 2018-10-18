import Vector from './vector.js'
import { WIDTH, HEIGHT, PARTICLE_RADIUS, VELOCITY } from '../constants/index.js'

const randomPosition = ({ radius }) => {
  const x = Math.floor(Math.random() * (WIDTH - (2 * radius)) + radius)
  const y = Math.floor(Math.random() * (HEIGHT - (2 * radius)) + radius)

  return new Vector({ x, y })
}

const randomVelocity = () => {
  // random number between [-VELOCITY, VELOCITY]
  const x = Math.floor(Math.random() * VELOCITY * 2) - VELOCITY
  const y = Math.floor(Math.random() * VELOCITY * 2) - VELOCITY

  if (x === 0 || y === 0) {
    return randomVelocity()
  }

  return new Vector({ x, y })
}

class Particle {
  constructor ({ position, velocity, radius }) {
    this.radius = radius || PARTICLE_RADIUS
    this.position = position || randomPosition({ radius: this.radius })
    this.velocity = velocity || randomVelocity()
  }

  move () {
    this.position = this.position.add(this.velocity)
    this.bound()
  }

  bound () {
    if (this.position.x - this.radius <= 0) {
      this.position = new Vector({ x: this.radius, y: this.position.y })
      this.velocity = new Vector({ x: -this.velocity.x, y: this.velocity.y })
    }

    if (this.position.x + this.radius >= WIDTH) {
      this.position = new Vector({ x: WIDTH - this.radius, y: this.position.y })
      this.velocity = new Vector({ x: -this.velocity.x, y: this.velocity.y })
    }

    if (this.position.y - this.radius <= 0) {
      this.position = new Vector({ x: this.position.x, y: this.radius })
      this.velocity = new Vector({ x: this.velocity.x, y: -this.velocity.y })
    }

    if (this.position.y + this.radius >= HEIGHT) {
      this.position = new Vector({ x: this.position.x, y: HEIGHT - this.radius })
      this.velocity = new Vector({ x: this.velocity.x, y: -this.velocity.y })
    }
  }

  toJSON () {
    const { radius } = this
    const { x, y } = this.position

    return { x, y, radius }
  }
}

export default Particle
