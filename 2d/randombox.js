const canvasSketch = require('canvas-sketch')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    let canvas = document.querySelector('canvas')
    context = canvas.getContext('2d')
    ;[width, height, gap] = [60, 60, 20]
    let x, y

    for (const i of Array(5).keys()) {
      for (const j of Array(5).keys()) {
        ;[x, y] = [100 + (width + gap) * i, 100 + (height + gap) * j]
        context.lineWidth = 5
        context.beginPath()
        context.rect(x, y, width, height)
        context.fillStyle = 'blue'
        context.fill()
        context.stroke()

        if (Math.random() > 0.5) {
          context.lineWidth = 0
          context.beginPath()
          context.rect(x + 8, y + 8, width - 16, height - 16)
          context.fillStyle = 'red'
          context.fill()
          context.stroke()
        }
      }
    }
  }
}

canvasSketch(sketch, settings)
