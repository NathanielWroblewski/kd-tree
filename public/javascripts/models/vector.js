class Vector {
  constructor ({ x = 0, y = 0 }) {
    this.x = x
    this.y = y
  }

  add ({ x, y }) {
    return new Vector({ x: this.x + x, y: this.y + y })
  }

  subtract ({ x, y }) {
    return this.add({ x: -x, y: -y })
  }
}

export default Vector
