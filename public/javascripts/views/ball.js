import { TAU } from '../constants/index.js'
import renderParticle from './particle.js'

const renderConnection = ({ element, source, destination, color }) => {
  const context = element.getContext('2d')
  const { x, y } = source.toJSON()
  const json = destination.toJSON()

  context.strokeStyle = color
  context.lineWidth = 2
  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(json.x, json.y)
  context.stroke()
}

const render = ({ element, model, neighbors = [], color = '#111' }) => {
  const context = element.getContext('2d')

  neighbors.forEach(particle => {
    renderConnection({ element, source: model, destination: particle, color })
    renderParticle({ element, model: particle, color })
  })

  renderParticle({ element, model, color })
}

export default render
