import Particle from './models/particle.js'
import Particles from './models/particles.js'
import Balls from './models/balls.js'
import renderBall from './views/ball.js'
import renderParticle from './views/particle.js'
import renderPartitions from './views/partitions.js'
import renderTree from './views/tree.js'
import renderTraversal from './views/traversal.js'
import clear from './views/screen.js'
import { COLORSPACE, BALL_RADIUS } from './constants/index.js'

const { requestAnimationFrame } = window

// Figure 1
const fig1 = document.querySelector('.points')
const particles = new Particles({})
const balls = new Balls({})
const colors = balls.map(() => (
  `#${Math.floor(Math.random() * COLORSPACE).toString(16)}`
))

const step = () => {
  clear({ element: fig1 })

  balls.items.forEach((ball, index) => {
    ball.move()

    const { x, y } = ball.toJSON()
    const neighbor = particles.nearest({ to: [x, y] })
    const color = colors[index];

    renderBall({
      element: fig1,
      model: ball,
      color,
      neighbors: [neighbor]
    })
  })

  requestAnimationFrame(step)
}

step()

// Backgrounds
// canvases are stacked over the particle background to avoid iterating over
// particles in each frame
const backgrounds = document.querySelectorAll('.background')

particles.elements().forEach(model => (
  backgrounds.forEach(element => (
    renderParticle({ element, model })
  ))
))

// Figure 2
const tree = document.querySelector('.tree')
const partitions = document.querySelector('.partitions')
let maxDepth = 0

setInterval(() => {
  maxDepth = maxDepth === 8 ? 0 : maxDepth + 1
  clear({ element: partitions })
  renderPartitions({ element: partitions, tree: particles.tree, maxDepth })

  clear({ element: tree })
  renderTree({ element: tree, tree: particles.tree, maxDepth })
}, 800)

// Figure 3
const point = document.querySelector('.point')
const treeBackground = document.querySelector('.tree-background')
const traversal = document.querySelector('.traversal')
const ball = new Particle({ radius: BALL_RADIUS })
const color = '#666'

renderTree({ element: treeBackground, tree: particles.tree, maxDepth: 8 })

const animate = () => {
  clear({ element: point })
  clear({ element: traversal })

  ball.move()

  const { x, y } = ball.toJSON()
  const node = particles.nearest({ to: [x, y], returnNode: true })
  const neighbor = node.element

  renderBall({
    element: point,
    model: ball,
    color,
    neighbors: [neighbor]
  })
  renderTraversal({
    element: traversal,
    tree: particles.tree,
    nearest: node,
    color,
  })

  requestAnimationFrame(animate)
}

animate()
