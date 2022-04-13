const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const colorCount = random.rangeFloor(1, 14) // value btw 1 and 6
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount) // 5 color single pallet
  console.log(palette)
  const createGrid = (count) => {
    const points = []

    for (const x of Array(count).keys()) {
      for (const y of Array(count).keys()) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push({
          color: random.pick(palette),
          radius: 0.002 + Math.abs(random.gaussian()) * 0.019,
          position: [u, v],
        })
      }
    }
    return points
  }

  random.setSeed(11) //fixed random
  const count = 30
  const points = createGrid(count).filter(() =>
    random.value() > 0.63 ? true : false
  )
  const margin = 250
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach((data) => {
      const { color, position, radius } = data
      const [u, v] = position
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, radius * width, 0, Math.PI * 2, false)
      context.fillStyle = color
      context.fill()
    })
  }
}

canvasSketch(sketch, settings)
