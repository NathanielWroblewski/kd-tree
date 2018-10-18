import { TAU } from '../constants/index.js'

const render = ({ element, model, color = '#e5e5df' }) => {
  const context = element.getContext('2d')
  const { x, y, radius } = model.toJSON()

  context.fillStyle = color
  context.beginPath()
  context.arc(x, y, radius, 0, TAU)
  context.fill()
}

export default render
