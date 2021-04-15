<template>
    <div>
        <canvas @mousedown="mousedownF"
                @mousemove="mousemoveF"
                @mouseup="mouseupF"
                ref="canvasF"
        ></canvas>
    </div>
</template>

<script>
  export default {
    name: 'signature',
    props: {
      canvasWidth: {
        default: 300
      },
      canvasHeight: {
        default: 300
      },
      lineColor: {
        default: 'black'
      },
      lineWidth: {
        default: 1
      }
    },
    data () {
      return {
        isDraw: false,
        canvas: '',
        canvasTxt: '',
        points: [],
        startx: '',
        starty: '',
        imgUrl: ''
      }
    },
    mounted () {
      this.canvas = this.$refs.canvasF
      this.canvas.height = 300
      this.canvas.width = 300
      this.canvasTxt = this.canvas.getContext('2d')
      this.canvasTxt.strokeStyle = this.linecolor
      this.canvasTxt.lineWidth = this.lineWidth
    },
    methods: {
      mousedownF (event) {
        let e = event || window.event
        e.preventDefault()
        let obj = {
          x: e.offsetX,
          y: e.offsetY
        }
        this.startx = obj.x
        this.starty = obj.y
        this.canvasTxt.beginPath()
        this.points.push(obj)
        this.isDraw = true
      },
      mousemoveF (event) {
        let e = event || event
        e.preventDefault()
        if (this.isDraw) {
          let obj = {
            x: e.offsetX,
            y: e.offsetY
          }
          this.canvasTxt.moveTo(this.startx, this.starty)
          this.canvasTxt.lineTo(obj.x, obj.y)
          this.canvasTxt.stroke()
          this.startx = obj.x
          this.starty = obj.y
          this.points.push(obj)
        }
      },
      mouseupF (event) {
        let e = event || event
        e.preventDefault()
        if (this.isDraw) {
          let obj = {
            x: e.offsetX,
            y: e.offsetY
          }
          this.canvasTxt.closePath()
          this.points.push(obj)
          this.points.push({ x: -1, y: -1 })
          this.isDraw = false
        }
      },
      clearCanvas () {
        this.canvasTxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.points = []
        this.isDraw = false
      },
      getImgUrl () {
        this.imgUrl = this.canvas.toDataURL('image/png')
        return this.imgUrl
      }
    }
  }
</script>

<style scoped>

</style>