const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const createGrid = (count) => {
    const points = []

    for (const x of Array(count).keys()) {
      for (const y of Array(count).keys()) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push([u, v])
      }
    }
    return points
  }

  random.setSeed(12) //fixed random
  const count = 30
  const points = createGrid(count).filter(() =>
    random.value() > 0.5 ? true : false
  )
  const margin = 250
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)
    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, 10, 0, Math.PI * 2, false)
      context.strokeStyle = 'black'
      context.lineWidth = 20
      context.stroke()
    })
  }
}

canvasSketch(sketch, settings)
