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

        const radius = 0.005 + Math.abs(random.noise2D(u, v)) * 0.02
        points.push({
          color: random.pick(palette),
          radius,
          position: [u, v],
          rotation: random.noise2D(u, v),
        })
      }
    }
    return points
  }

  // random.setSeed(7) //fixed random
  const count = 58
  const points = createGrid(count).filter(() =>
    random.value() > 0.63 ? true : false
  )
  const margin = 250
  return ({ context, width, height }) => {
    const ctx = context
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)

    points.forEach((data) => {
      const { color, position, radius, rotation } = data
      const [u, v] = position
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      ctx.save()
      ctx.fillStyle = color
      ctx.font = `${radius * width * 6}px Operator Mono Bold`
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.fillText('-', 0, 0)

      ctx.restore()
    })
  }
}

canvasSketch(sketch, settings)
