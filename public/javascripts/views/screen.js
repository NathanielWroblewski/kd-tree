import { WIDTH, HEIGHT } from '../constants/index.js'

const clear = ({ element }) => {
  const context = element.getContext('2d')

  context.clearRect(0, 0, WIDTH, HEIGHT)
}

export default clear
